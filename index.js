const { select, input } = require('@inquirer/prompts')

// Inicialize `metas` como um array vazio
let metas = []

const cadastrarMeta = async () => {
    // Corrigido: Use o nome da variável `meta` na função sem conflito
    const novaMeta = await input({ message: "insira a sua meta aqui: " })

    if (novaMeta.length === 0) {  // Corrigido: Use `===` para comparação
        console.log('este campo não pode estar vazio!')
        return
    }

    metas.push(
        { value: novaMeta, checked: false }
    )
}

const start = async () => {
    while (true) {
        const opcao = await select({
            message: "menu",
            choices: [
                {
                    name: "inserir metas",
                    value: "inserir"
                },
                {
                    name: "adicionar metas",
                    value: "adicionar"
                },
                {
                    name: "sair",
                    value: "sair"
                }
            ]
        })

        switch (opcao) {
            case "inserir":
                await cadastrarMeta()
                console.log(metas)
                break
            case "adicionar":
                console.log("adicionar metas")
                break
            case "sair":
                console.log("até a próxima!")
                return
        }
    }
}


start()