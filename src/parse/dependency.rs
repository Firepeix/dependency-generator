use std::{path::PathBuf, fs, error::Error};
use regex::Regex;

use super::{Instanceable, InnerDependency};


#[derive(Debug, Clone, PartialEq)]
pub struct Dependency {
    pub fqdn: String,
    pub name: String,
    varname: String,
    dependencies: Vec<InnerDependency>,
    pub loaded: bool
}

impl Dependency {
   fn new(base: &str) -> Self {
    let name = base.split('/').last().unwrap_or("").replace(".js", "");
    Dependency { 
        fqdn: base.to_string(), 
        varname: name.clone().to_lowercase(), 
        name, 
        dependencies: vec![],
        loaded: false
    }
   }

   fn parse_dependencies(&mut self) -> Result<(), Box<dyn Error>> {
    if let Ok(contents) = fs::read_to_string(&self.fqdn) {
        let constructor_locator = Regex::new(r"\*\*.*constructor")?;
        let dependency_locator = Regex::new(r"\{([^\}]*)\}")?;
        let mut loaded = false;
        constructor_locator.find_iter(&contents.replace('\n', "")).for_each(|capture| {
            loaded = true;
            dependency_locator.captures_iter(capture.as_str()).for_each(|dependency| {
               loaded = false;
               if let Some(name) = dependency.get(1) {
                self.dependencies.push(InnerDependency::new(name.as_str(), name.as_str().to_lowercase()));
                loaded = true;
                }
            });
        });

        self.loaded = true
    }
    Ok(())
   }


   pub fn has_dependencies(&self) -> bool {
    !self.dependencies.is_empty()
   }

   
   pub fn dependencies_exists_in<T: Instanceable>(&self, instanciated: &[T]) -> bool {
    self.dependencies.iter().all(|inner| instanciated.iter().any(|dep| dep.of_kind(&inner.name)))
   }

   pub fn inject<T: Instanceable>(&self, instanciated: &[T]) -> Dependency {
    let mut injected_dependency = self.clone();
    let mut inners = vec![];
    for dependency in &self.dependencies {
        if let Some(construct) = instanciated.iter().find(|instance| instance.of_kind(&dependency.name)) {
            inners.push(construct.to_inner())
        }
    }
    injected_dependency.dependencies = inners;
    injected_dependency
   }

}

impl Instanceable for Dependency {
    fn of_kind(&self, kind: &str) -> bool {
       kind == self.name
    }

    fn declare(&self) -> String {
        let constructor = self.dependencies.iter().map(|i| i.varname.clone()).collect::<Vec<String>>().join(",");
        format!("const {} = new {}({})", self.varname, self.name, constructor)
    }

    fn to_inner(&self) -> InnerDependency {
        InnerDependency { name: self.name.clone(), varname: self.varname.clone() }
    }

    fn id(&self,) -> String {
        self.name.clone()
    }
}

impl TryFrom<&PathBuf> for Dependency {
    type Error = Box<dyn Error>;
    fn try_from(path: &PathBuf) -> Result<Self, Self::Error> {
        let mut dependency = Dependency::new(path.to_str().unwrap_or("default"));
        dependency.parse_dependencies()?;
        Ok(dependency)
    }
}