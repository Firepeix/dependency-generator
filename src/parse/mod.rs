use std::{path::PathBuf, error::Error};

use self::dependency::Dependency;

pub mod dependency;

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