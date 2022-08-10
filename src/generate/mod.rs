
use std::fmt::format;

use crate::{Dependency, parse::{defaults::DefaultDependency, Instanceable, Dependencies}};

pub fn generate(depedencies: &[Dependency], defaults: &[DefaultDependency]) -> String {
    let mut lines = vec![];
    lines.append(&mut imports(depedencies, defaults));
    lines.append(&mut instantiate(depedencies, defaults));
    lines.push(export(depedencies, defaults));
    lines.join("\n")
}

fn imports(depedencies: &[Dependency], defaults: &[DefaultDependency]) -> Vec<String> {
    let mut imports = vec![];
    for dependency in depedencies {
        imports.push(format!("import {} from '{}'", dependency.name, dependency.fqdn))
    }

    for default in defaults {
        imports.push(default.imports.clone())
    }
    imports.push("".to_string());
    imports
}

fn instantiate(depedencies: &[Dependency], defaults: &[DefaultDependency]) -> Vec<String> {
    let mut instantiated: Vec<Dependencies> = vec![];
    instantiate_defaults(defaults, &mut instantiated);
    instantiate_dependencyless(depedencies, &mut instantiated);
    instantiate_dependencyfull(depedencies, &mut instantiated, 0);
    let mut instances = instantiated.iter().map(|dependency| dependency.declare()).collect::<Vec<String>>();
    instances.push("".to_string());
    instances
}

fn instantiate_defaults(defaults: &[DefaultDependency], instantiated: &mut Vec<Dependencies>) {
   for default in defaults {
    instantiated.push(Dependencies::Default(default.clone()))
   }
 }

fn instantiate_dependencyless(depedencies: &[Dependency], instantiated: &mut Vec<Dependencies>) {
   for dependency in depedencies {
       if !dependency.has_dependencies() {
           instantiated.push(Dependencies::Raw(dependency.clone()))
       }
   }
}

fn instantiate_dependencyfull(depedencies: &[Dependency], instantiated: &mut Vec<Dependencies>, runs: u8) {
    const MAX_RUNS: u8 = 100_u8;
    let was_loaded = depedencies.iter().all(|s| instantiated.iter().any(|dep| s.id() == dep.id()));
    println!("Declarando dependencias: {runs} de {MAX_RUNS}");
    if runs < MAX_RUNS && !was_loaded {
        for dependency in depedencies {
            if dependency.has_dependencies() && dependency.dependencies_exists_in(instantiated) {
                instantiated.push(Dependencies::Raw(dependency.inject(instantiated)))
            }
        }

        instantiate_dependencyfull(depedencies, instantiated, runs + 1)
    }
 }

 fn export(depedencies: &[Dependency], defaults: &[DefaultDependency]) -> String {
    let exports = depedencies.iter().map(|d| d.varname.clone()).collect::<Vec<String>>().join(",\n");
    let export_defaults = defaults.iter().filter_map(|d| {
        if d.declaration.is_some() {
            return Some(d.varname.clone())
        }
        None
    }).collect::<Vec<String>>().join(",\n");

    format!("export {{ {}{} \n}}", exports, export_defaults)
 }