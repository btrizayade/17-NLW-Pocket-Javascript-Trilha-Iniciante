const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "bem-vindo ao app de metas desenvolvido na 17º NWL Pocket Javascript :)";

let metas

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch (erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const novaMeta = await input({ message: "insira a sua meta aqui: " })

    if (novaMeta.length === 0) {
        mensagem = "este campo não pode estar vazio!"
        return
    }

    metas.push({ value: novaMeta, checked: false })

    mensagem = "meta cadastrada com sucesso!"
}

const listarMetas = async () => {
    if(metas.length === 0) {
        mensagem = "não existem metas!"
        return
    }

    const respostas = await checkbox({
        message: "selecione as suas meta(s) concluída(s): ",
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
        mensagem = 'nenhuma meta foi selecionada :('
        return
    }

    

    mensagem = "meta(s) concluída(s)"
}

const metasConcluidas = async () => {
    if(metas.length === 0) {
        mensagem = "não existem metas!"
        return
    }
    
    const concluídas = metas.filter((meta) => {
        return meta.checked
    })

    if(concluídas.length === 0) {
        console.log('não existem meta(s) concluída(s) :(')
        return
    }

    await select({
        message: "meta(s) concluída(s)",
        choices:[...concluídas]
    })
}

const metasAndamento = async () => {
    if(metas.length === 0) {
        mensagem = "não existem metas!"
        return
    }

    const andamento = metas.filter((meta) => {
        return meta.checked != true
    })

    if(andamento.length === 0){
        mensagem = "não existem meta(s) em andamento :)"
        return
    }

    await select({
        message: "metas em andamento: " + andamento.length,
        choices: [...andamento]
    })
}

const metasDeletadas = async () => {
    if(metas.length === 0) {
        mensagem = "não existem metas!"
        return
    }
    
    const itensParaDeletar = await checkbox({
        message: "Selecione uma meta para deletar: ",
        choices: metas.map(meta => ({
            name: meta.value,
            value: meta.value,
            checked: false // permite seleção para deletar independente do estado atual do checked
        }))
    })

    if (itensParaDeletar.length === 0) {
        mensagem = "nenhum item foi deletado"
        return
    }

    // removendo as metas selecionadas para deletar
    metas = metas.filter(meta => !itensParaDeletar.includes(meta.value))

    mensagem = "meta(s) deletada(s) com sucesso!"
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    await carregarMetas()

    while (true) {
        mostrarMensagem()
        await salvarMetas()

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
