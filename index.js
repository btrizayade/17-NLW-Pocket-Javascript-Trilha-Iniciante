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

    metas.forEach(meta => {
        meta.checked = respostas.includes(meta.value)
    })

    if (respostas.length === 0) {
        console.log('nenhuma meta foi selecionada :(')
        return
    }

    

    console.log('metas concluídas:', metas)
}

const metasConcluidas = async () => {
    const concluídas = metas.filter((meta) => {
        return meta.checked
    })

    if(concluídas.length === 0) {
        console.log('não existem metas concluídas :(')
        return
    }

    await select({
        message: "metas concluídas",
        choices:[...concluídas]
    })
}

const metasAndamento = async () => {
    const andamento = metas.filter((meta) => {
        return meta.checked != true
    })

    if(andamento.length === 0){
        console.log('não existem metas em andamento :)')
        return
    }

    await select({
        message: "metas em andamento: " + andamento.length,
        choices: [...andamento]
    })
}

const metasDeletadas = async () => {
    const itensParaDeletar = await checkbox({
        message: "Selecione uma meta para deletar: ",
        choices: metas.map(meta => ({
            name: meta.value,
            value: meta.value,
            checked: false // permite seleção para deletar independente do estado atual do checked
        }))
    })

    if (itensParaDeletar.length === 0) {
        console.log("Nenhum item foi deletado")
        return
    }

    // removendo as metas selecionadas para deletar
    metas = metas.filter(meta => !itensParaDeletar.includes(meta.value))

    console.log("meta(s) deletada(s) com sucesso!")
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
                    name: "metas em andamento", 
                    value: "andamento" 
                },
                { 
                    name: "deletar metas", 
                    value: "deletar" 
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
                await metasConcluidas()
                break
            case "andamento":
                await metasAndamento()
                break
            case "deletar":
                await metasDeletadas()
                break
            case "sair":
                console.log("até a próxima!")
                return
        }
    }
}

start()
