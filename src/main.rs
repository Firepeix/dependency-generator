use std::{path::{ PathBuf}, fs};
use dependency_generator::{get_dependencies, generate};

fn main() {
    let dependencies = get_dependencies(&vec![PathBuf::from("example/src/mappers"), PathBuf::from("example/src/repositories")]).unwrap();
    let contents = generate(&dependencies);
    fs::write("test.js", contents).unwrap()
}
