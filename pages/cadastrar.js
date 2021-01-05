import React, { useState } from 'react'

function Cadastrar() {

    const [meta, setMeta] = useState({
        name: '',
        description: '',
        status: '',
    })

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    })

    const onChangeInput = event => setMeta({...meta, [event.target.name]: event.target.value})

    const sendMeta = async event => {
        event.preventDefault()
        
        try{
            const res = await fetch('http://localhost:8080/metas', {
                method: 'POST',
                body: JSON.stringify(meta),
                headers: {'Content-Type': 'application/json'}
            })
            const responseEnv = await res.json()
            if (responseEnv.error) {
                setResponse({
                    formSave: false,
                    type: 'error',
                    message: responseEnv.message
                })
            } else {
                setResponse({
                    formSave: false,
                    type: 'sucess',
                    message: responseEnv.message
                })
            }
        } catch (err) {
            setResponse({
                formSave: false,
                type: 'error',
                message: 'Erro: Meta não cadastrada, tentar mais tarde.'
            })
        }
    }

    return (
        <>
            <h1>Cadastrar Minha Meta</h1>
            <hr />

            <form onSubmit={sendMeta}>
                <label>Meta </label>
                <input type="text" name="name" id="name" 
                placeholder="Aprender violão" 
                onChange={onChangeInput}/>
                <br />

                <label>Descrição </label>
                <input type="text" name="description" id="description" 
                placeholder="Vou aprender violão em 3 meses" 
                onChange={onChangeInput}/>
                <br />

                <label>Status </label>
                <input type="text" name="status" id="status" 
                placeholder="Pendente" 
                onChange={onChangeInput}/>
                <br />

                <button type="submit">Cadastrar</button>

            </form>
        </>
    )
}

export default Cadastrar