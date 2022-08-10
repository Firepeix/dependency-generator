use std::{path::PathBuf, fs, error::Error};

use super::Instanceable;

#[derive(Debug, Clone, PartialEq)]
pub struct DefaultDependency {
   pub imports: String,
   possible_names: Vec<String>,
   pub varname: String,
   pub declaration: Option<String>
}

impl DefaultDependency {
    fn new(imports: &str, possible_names: &str, varname: &str, declaration: Option<&str>) -> Self {
        DefaultDependency {
            imports: imports.to_string(),
            possible_names: possible_names.split('-').map(|name| name.to_string()).collect(),
            varname: varname.to_string(),
            declaration: declaration.map(|declare| declare.to_string())
        }
    }


    pub fn generate(path: &PathBuf) -> Result<Vec<Self>, Box<dyn Error>> {
        let contents = fs::read_to_string(path)?;
        contents.lines()
        .filter_map(|line| {
            if line != "" {
                let fields = line.split(",").collect::<Vec<&str>>();
                if fields.len() > 2 && fields.len() < 5 {
                    let declaration = if fields.len() == 3 { None } else {Some(fields[3])};
                    return Some(Ok(DefaultDependency::new(fields[0], fields[1], fields[2], declaration)))
                }
                return Some(Err("Encontrado dependencia fora de ordem".into()))
            }
            None
        })
        .collect()
    }
}

impl Instanceable for DefaultDependency {
    fn of_kind(&self, kind: &str) -> bool {
        self.possible_names.contains(&kind.to_string())
    }

    fn declare(&self,) -> String {
        match &self.declaration {
            Some(dec) => dec.clone(),
            None => "".to_string()
        }
    }

    fn to_inner(&self) -> super::InnerDependency {
        super::InnerDependency { name: self.id(), varname: self.varname.clone() }
    }

    fn id(&self,) -> String {
        return self.varname.clone()
    }
}