window.onload = function() {
  document.querySelector("html").className = "js";

  const webroot = "https://spec.xproc.org/";
  SaxonJS.getResource({"location": `${webroot}dashboard.json`,
                       "type": "json"})
    .then(config => {
      SaxonJS.transform({
        "stylesheetLocation": "xsl/dashboard.sef.json?date=2022-09-24-4",
        "initialTemplate": "Q{}main",
        "stylesheetParams": {
          "Q{}config": config
        }
      }, "async");
    })
    .catch(err => {
      // There's a fair bit of config here where we could in principle
      // get the information from the GitHub API. Unfortunately, that
      // API is rate limited and for non-logged-in users, it's easy to
      // go over the limit. (Perhaps someday I'll make a version that
      // you can login with for a higher limit. But really, this
      // configuration doesn't change very often.
      console.log(`Failed to load ${webroot}dashboard.json; using defaults`);
      const config = {
        "web-root": webroot,
        "main-branch-name": "master",
        "branch-prefix": "",
        "branch-suffix": "/head",
        "pr-path": "/pr/",
        "branches": {
          "xproc": {
            "3.0-specification": {
              "gh-pages": "#IGNORE"
            },
            "3.0-steps": {
              "gh-pages": "#IGNORE"
            }
          }
        },
        "documents": {
          "xproc": {
            "3.0-specification": ["xproc", "overview"],
            "3.0-steps": ["steps", "file", "ixml", "mail", "os", "paged-media",
                          "rdf", "run", "text", "validation", "xvrl"]
          }
        },
        "indexes": {
          "xproc": {
            "3.0-specification": {
              "xproc": {
                "index.html": "XProc 3.0: An XML Pipeline Language"
              },
              "overview": {
                "index.html": "XProc 3.0 Overview"
              }
            },
            "3.0-steps": {
              "steps": {
                "index.html": "XProc 3.0: Standard Step Library"
              },
              "file": {
                "index.html": "XProc 3.0: file steps"
              },
              "ixml": {
                "index.html": "XProc 3.0: Invisible XML steps"
              },
              "mail": {
                "index.html": "XProc 3.0: mail steps"
              },
              "os": {
                "index.html": "XProc 3.0: operating system steps"
              },
              "paged-media": {
                "index.html": "XProc 3.0: paged media steps"
              },
              "rdf": {
                "index.html": "XProc 3.0: RDF steps"
              },
              "run": {
                "index.html": "XProc 3.0: dynamic pipeline execution"
              },
              "text": {
                "index.html": "XProc 3.0: text steps"
              },
              "validation": {
                "index.html": "XProc 3.0: validation steps"
              },
              "xvrl": {
                "index.html": "XProc 3.0: Extensible Validation Report Language (XVRL)"
              }
            }
          }
        }
      };
      SaxonJS.transform({
        "stylesheetLocation": "xsl/dashboard.sef.json?date=2022-09-24-4",
        "initialTemplate": "Q{}main",
        "stylesheetParams": {
          "Q{}config": config
        }
      }, "async");
    });
};
