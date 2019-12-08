import React from 'react'
import { getCards } from '../../network/mtgApi'
import styled from 'styled-components'

import Cards from './Cards'
import Search from './SearchField'

const StyledSearch = styled.div`
  padding: 19px;
`

class App extends React.Component {
  state = { loading: false, cards: [] }

  componentDidMount() {
    // this.onSearch('re')
  }

  onSearch = async searchString => {
    this.setState({ cards: [], loading: true })
    const data = await getCards(searchString)
    const sortedCards = data.sort(card => (card.name.toLowerCase() === searchString.toLowerCase() ? -1 : 1))

    this.setState({ cards: sortedCards, loading: false })
  }

  render() {
    const { cards, loading } = this.state

    return (
      <StyledSearch>
        <Search onSearch={this.onSearch} style={{ width: 400 }} />
        <Cards cards={cards} loading={loading} />
      </StyledSearch>
    )
  }
}

export default App
