import React, { Component } from 'react';
import './App.css';
import MemoryCard from './MemoryCard.js';

 let generateDeck=() => {
    let symbols=["∆","∫","∂","§","∞","¢","£","$"];
    let deck = [];
   for(let i = 0; i <16;i++){
     deck.push({
       symbol:symbols[i%8],
       isFlipped:false
     })
   }

    shuffle(deck);
    return deck;
  }
  let shuffle=(a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }



class App extends Component {
  constructor(props){
    super(props)
    this.state={
      deck:generateDeck(),
      pickedCards:[]
    }
  }
  pickCard(cardIndex){
   
    let newDeck = this.state.deck.map(card => {
      return {...card}
    });
    if (newDeck[cardIndex].isFlipped) return;
    newDeck[cardIndex].isFlipped = true;
    
    let newPickedCards = this.state.pickedCards.concat(cardIndex);

    // if they've just selected their second card, compare the two.
    //.   if they're not the same symbol, flip them back over
    if (newPickedCards.length == 2) {
      var card1Index = newPickedCards[0];
      var card2Index = newPickedCards[1];
      var card1 = newDeck[card1Index];
      var card2 = newDeck[card2Index];
      if ( card1.symbol !== card2.symbol ) {
        // unflip both cards
        setTimeout(()=>{
          this.unflipCards(card1Index, card2Index);
        }, 1000 );
      } 
      newPickedCards = [];
    }
    this.setState({
      deck:newDeck,
      pickedCards:newPickedCards
    })
  }

unflipCards(card1Index,card2Index){
  let newDeck = this.state.deck.map(card => {
    return {...card}
  });

  newDeck[card1Index].isFlipped = false;
  newDeck[card2Index].isFlipped = false;
  this.setState({
    deck:newDeck
  })
}
  render() {
    let cardsJSX=this.state.deck.map((card,i)=>{
        return <MemoryCard key={i} symbol={card.symbol} isFlipped={card.isFlipped} pickCard={this.pickCard.bind(this,i)}/>
    });
    return (
      <div className="App">
        <header className="App-header">
        <h1>Memory Game </h1>
        <p>MatchCard to win</p>
        </header>
        <div> 
          {cardsJSX.slice(0,4)}
        </div>
        <div> 
        {cardsJSX.slice(4,8)}
        </div>
        <div> 
        {cardsJSX.slice(8,12)}
        </div>
        <div> 
        {cardsJSX.slice(12,16)}
        </div>
       
        
      </div>
    );
  }
}

export default App;
