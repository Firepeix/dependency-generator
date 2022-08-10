use std::{path::{ PathBuf}, fs};
use dependency_generator::{get_dependencies, generate, get_default_dependencies};

fn main() {
    let dependencies = get_dependencies(&vec![PathBuf::from("example/src/mappers"), PathBuf::from("example/src/repositories"), PathBuf::from("example/src/services")]).unwrap();
    let defaults = get_default_dependencies(&PathBuf::from("defaults.depedency-generator")).unwrap().unwrap_or(vec![]);
    let contents = generate(&dependencies, &defaults);
    fs::write("test.js", contents).unwrap()
}
