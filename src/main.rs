use std::path::{ PathBuf};
use js_dependency_generator::get_dependencies;

fn main() {
    let dependencies = get_dependencies(&vec![PathBuf::from("example/mappers")]);
}
