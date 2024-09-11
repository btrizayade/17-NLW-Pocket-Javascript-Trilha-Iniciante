const { select } = require('@inquirer/prompts')

const start = async () => {
    while (true) {
        const opcao = await select({
            message: "menu",
            choices: [
                {
                    name: "vamos cadastrar",
                    value: "cadastrar"
                },
                {
                    name: "inserir metas",
                    value: "inserir"
                },
                {
                    name: "sair",
                    value: "sair"
                }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                console.log("vamos cadastrar")
                break
            case "inserir":
                console.log("inserir metas")
                break
            case "sair":
                console.log("até a próxima!")
                return
        }
    }
}

start()