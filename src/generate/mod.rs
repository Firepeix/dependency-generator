
use crate::{Dependency};

pub fn generate(depedencies: &[Dependency]) -> String {
    let mut lines = vec![];
    lines.append(&mut imports(depedencies));
    lines.join("\n")
}

fn imports(depedencies: &[Dependency]) -> Vec<String> {
    let mut imports = vec![];
    for dependency in depedencies {
        imports.push(format!("import {} from '{}'", dependency.name, dependency.fqdn))
    }
    imports
}