use std::{path::PathBuf, fs, error::Error};
use regex::Regex;

struct InnerDependency {
    name: String
}

impl InnerDependency {
    fn new(name: &str) -> Self {
        InnerDependency { name: name.to_string() }
    }
}

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
                self.dependencies.push(InnerDependency::new(name.as_str()));
                loaded = true;
                }
            });
        });

        self.loaded = true
    }
    Ok(())
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