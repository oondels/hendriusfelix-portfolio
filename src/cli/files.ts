export const files = {
  "type": "directory",
  "name": "root",
  "children": [
    {
      "type": "directory",
      "name": "client",
      "children": [
        {
          "type": "directory",
          "name": "src",
          "children": [
            {
              "type": "file",
              "name": "main.ts",
              "content": ""
            },
            {
              "type": "file",
              "name": "App.vue",
              "content": ""
            },
            {
              "type": "directory",
              "name": "cli",
              "children": [
                {
                  "type": "directory",
                  "name": "commands",
                  "children": [
                    {
                      "type": "file",
                      "name": "FileSystem.ts",
                      "content": ""
                    },
                    {
                      "type": "file",
                      "name": "FileSystemManager.ts",
                      "content": ""
                    },
                    {
                      "type": "file",
                      "name": "testes.ts",
                      "content": ""
                    }
                  ]
                },
                {
                  "type": "directory",
                  "name": "data",
                  "children": [
                    {
                      "type": "file",
                      "name": "TerminalShell.vue",
                      "content": ""
                    }
                  ]
                }
              ]
            },
            {
              "type": "directory",
              "name": "components",
              "children": [
                {
                  "type": "directory",
                  "name": "sections",
                  "children": [
                    {
                      "type": "file",
                      "name": "AboutSection.vue",
                      "content": ""
                    },
                    {
                      "type": "file",
                      "name": "ContactSection.vue",
                      "content": ""
                    },
                    {
                      "type": "file",
                      "name": "ProjectsSection.vue",
                      "content": ""
                    },
                    {
                      "type": "file",
                      "name": "SkillsSection.vue",
                      "content": ""
                    }
                  ]
                },
                {
                  "type": "directory",
                  "name": "terminal",
                  "children": [
                    {
                      "type": "file",
                      "name": "TerminalOutput.vue",
                      "content": ""
                    },
                    {
                      "type": "file",
                      "name": "TerminalPrompt.vue",
                      "content": ""
                    },
                    {
                      "type": "file",
                      "name": "TerminalMode.vue",
                      "content": ""
                    }
                  ]
                },
                {
                  "type": "file",
                  "name": "Header.vue",
                  "content": ""
                },
                {
                  "type": "file",
                  "name": "HelloWorld.vue",
                  "content": ""
                },
                {
                  "type": "file",
                  "name": "MainContent.vue",
                  "content": ""
                }
              ]
            }
          ]
        }
      ]
    },
    {
  "type": "directory",
  "name": "server",
  "children": [
    {
      "type": "file",
      "name": "package.json",
      "content": ""
    },
    {
      "type": "file",
      "name": "tsconfig.json",
      "content": ""
    },
    {
      "type": "file",
      "name": ".env.example",
      "content": ""
    },
    {
      "type": "directory",
      "name": "src",
      "children": [
        {
          "type": "file",
          "name": "index.ts",
          "content": ""
        },
        {
          "type": "directory",
          "name": "modules",
          "children": [
            {
              "type": "directory",
              "name": "auth",
              "children": [
                {
                  "type": "file",
                  "name": "auth.controller.ts",
                  "content": ""
                },
                {
                  "type": "file",
                  "name": "auth.service.ts",
                  "content": ""
                },
                {
                  "type": "file",
                  "name": "auth.routes.ts",
                  "content": ""
                },
                {
                  "type": "file",
                  "name": "auth.dto.ts",
                  "content": ""
                },
                {
                  "type": "file",
                  "name": "auth.entity.ts",
                  "content": ""
                }
              ]
            },
            {
              "type": "directory",
              "name": "users",
              "children": [
                {
                  "type": "file",
                  "name": "user.controller.ts",
                  "content": ""
                },
                {
                  "type": "file",
                  "name": "user.service.ts",
                  "content": ""
                },
                {
                  "type": "file",
                  "name": "user.routes.ts",
                  "content": ""
                },
                {
                  "type": "file",
                  "name": "user.dto.ts",
                  "content": ""
                },
                {
                  "type": "file",
                  "name": "user.entity.ts",
                  "content": ""
                }
              ]
            }
          ]
        },
        {
          "type": "directory",
          "name": "utils",
          "children": [
            {
              "type": "file",
              "name": "logger.ts",
              "content": ""
            },
            {
              "type": "file",
              "name": "password.ts",
              "content": ""
            },
            {
              "type": "file",
              "name": "response.ts",
              "content": ""
            }
          ]
        },
        {
          "type": "directory",
          "name": "config",
          "children": [
            {
              "type": "file",
              "name": "database.ts",
              "content": ""
            },
            {
              "type": "file",
              "name": "server.ts",
              "content": ""
            }
          ]
        },
        {
          "type": "directory",
          "name": "typeorm",
          "children": [
            {
              "type": "file",
              "name": "ormconfig.ts",
              "content": ""
            },
            {
              "type": "directory",
              "name": "migrations",
              "children": []
            }
          ]
        }
      ]
    }
  ]
}

  ]
}
