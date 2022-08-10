use std::{path::{ PathBuf}, fs, env, error::Error};
use dependency_generator::{get_dependencies, generate, get_default_dependencies};

fn main() {
    let dependencies = get_dependencies(&get_include_files().unwrap()).unwrap();
    let defaults = get_default_dependencies(&get_default_file()).unwrap().unwrap_or_default();
    let contents = generate(&dependencies, &defaults);
    fs::write(get_output_path(), contents).unwrap()
}

fn get_include_files() -> Result<Vec<PathBuf>, Box<dyn Error>> {
    let include_path = PathBuf::from("includes.dg");
    if include_path.exists() {
        let contents = fs::read_to_string(include_path)?;
        return Ok(contents.lines().map(PathBuf::from).collect());
    }
    
    Err("Arquivo de inclusão não existente: includes.dg".into())
}

fn get_default_file() -> PathBuf {
    let include_path = PathBuf::from("defaults.dg");
    if !include_path.exists() {
       println!("WARN Arquivo de dependencias padrão não encontrado: defaults.dg")
    }
    
    include_path
}

fn get_output_path() -> String {
    env::args().nth(1).unwrap_or_else(|| "dependencies".to_string())
}
