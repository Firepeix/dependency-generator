use std::{path::PathBuf, error::Error};

use self::{dependency::Dependency, defaults::DefaultDependency};

pub mod dependency;
pub mod defaults;


#[derive(Debug, Clone, PartialEq)]
pub struct InnerDependency {
    name: String,
    varname: String
}

impl InnerDependency {
    pub fn new(name: &str, varname: String) -> Self {
        InnerDependency { name: name.to_string(), varname: varname.to_string() }
    }
}

pub trait Instanceable {
   fn of_kind(&self, kind: &str) -> bool;
   fn to_inner(&self) -> InnerDependency;
   fn declare(&self,) -> String;
   fn id(&self,) -> String;
}

#[derive(Debug, PartialEq)]
pub enum Dependencies {
   Default(DefaultDependency),
   Raw(Dependency)
}

impl Instanceable for Dependencies {
    fn of_kind(&self, kind: &str) -> bool {
        match self {
         Dependencies::Raw(r) => r.of_kind(kind),
         Dependencies::Default(d) => d.of_kind(kind)
        }
    }

    fn declare(&self,) -> String {
      match self {
         Dependencies::Raw(r) => r.declare(),
         Dependencies::Default(d) => d.declare()
      }
    }

    fn to_inner(&self) -> InnerDependency {
      match self {
         Dependencies::Raw(r) => r.to_inner(),
         Dependencies::Default(d) => d.to_inner()
      }
    }

    fn id(&self,) -> String {
      match self {
         Dependencies::Raw(r) => r.id(),
         Dependencies::Default(d) => d.id()
      }
    }
}

pub fn parse(files: &[PathBuf]) -> Result<Vec<Dependency>, Box<dyn Error>> {
   files.iter()
   .map(|file| file.try_into())
   .filter(|dependency: &Result<Dependency, Box<dyn Error>>| {
      match dependency {
         Ok(result) => result.loaded,
         _ => true
      }
   })
   .collect()
}

pub fn parse_default(file: &PathBuf) -> Result<Option<Vec<DefaultDependency>>, Box<dyn Error>> {
   if file.exists() {
       return match DefaultDependency::generate(file) {
        Ok(dependencies) => Ok(Some(dependencies)),
        Err(err) => Err(err),
    }
   }
   Ok(None)
}