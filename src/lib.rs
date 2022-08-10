use std::{path::{PathBuf}, error::Error};

use parse::{dependency::Dependency, parse, parse_default, defaults::DefaultDependency};

mod parse;
mod generate;

pub fn get_dependencies(paths: &[PathBuf]) -> Result<Vec<Dependency>, Box<dyn Error>>{
  let files = find_files(paths)?;
  parse(&files)
}

pub fn get_default_dependencies(path: &PathBuf) -> Result<Option<Vec<DefaultDependency>>, Box<dyn Error>> {
  parse_default(path)
}

pub fn generate(depedencies: &[Dependency], defaults: &[DefaultDependency]) -> String {
  generate::generate(depedencies, defaults)
}

fn find_files(paths: &[PathBuf]) -> Result<Vec<PathBuf>, Box<dyn Error>> {
  let mut files = vec![];
  for path in paths {
    let dirs = path.read_dir()?;
    dirs.for_each(|dir| {
      if let Ok(folder) = dir {
        if folder.path().is_dir() {
          if let Ok(mut inner_files) = find_files(&[folder.path()]) {
            files.append(&mut inner_files);
          } 
        } else {
          files.push(folder.path())
        }
      }
    })  
  }

  Ok(files)
}