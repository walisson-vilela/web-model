import React from 'react'
import { Container, Content, Item, Itens } from './styles'

export function Widget32(){
    return(
     <>
        <Container>
            <h1> Distancia Média(KM) </h1>
            <Content>
            <header>
                <strong> 5,2 </strong>
                <span> Distância Média </span>
            </header>
            <Itens>
                <Item>
                    <strong> 30,1 </strong>
                    <span> Ativos</span>
                </Item>
                <Item>
                    <strong> 0.80</strong>
                    <span> Menor Distância</span>
                </Item>
            </Itens>
            </Content>

        </Container>
     </>

    )
}
