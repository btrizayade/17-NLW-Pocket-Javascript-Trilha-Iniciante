const { select, input, checkbox } = require('@inquirer/prompts')

let metas = []

const cadastrarMeta = async () => {
    const novaMeta = await input({ message: "insira a sua meta aqui: " })

    if (novaMeta.length === 0) {
        console.log('este campo não pode estar vazio!')
        return
    }

    metas.push({ value: novaMeta, checked: false })
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "selecione as suas metas concluídas: ",
        choices: metas.map(meta => ({
            name: meta.value,
            value: meta.value,
            checked: meta.checked
        }))
    })

    if (respostas.length === 0) {
        console.log('nenhuma meta foi selecionada :(')
        return
    }

    metas.forEach(meta => {
        meta.checked = respostas.includes(meta.value)
    })

    console.log('metas concluídas:', metas)
}

const metasRealizadas = async () => {
    const concluídas = metas.filter((meta) => {
        return meta.checked
    })

    if(concluídas.length === 0) {
        console.log('não existem metas concluídas :(')
        return
    }

    await select({
        message: "metas realizadas",
        choices:[...concluídas]
    })
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
                    name: "checar metas", 
                    value: "checar" 
                },
                { 
                    name: "metas concluídas", 
                    value: "concluídas" 
                },
                { 
                    name: "sair", 
                    value: "sair" 
                }
            ]
        })

        switch (opcao) {
            case "inserir":
                await cadastrarMeta();
                console.log('metas atuais:', metas)
                break
            case "checar":
                await listarMetas()
                break
            case "concluídas":
                await metasRealizadas()
                break
            case "sair":
                console.log("até a próxima!")
                return
        }
    }
}

start()
