let originalURL = 'https://docs.google.com/spreadsheets/d/1mFlMqmGzEQ8y5tbGUzfgQ7HWX41RLEKKve1RlTCdds0edit#gid=0';

const id = '1mFlMqmGzEQ8y5tbGUzfgQ7HWX41RLEKKve1RlTCdds0';

let source = `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`;

fetch(source)
  .then(res => res.json())
  .then(data => {
     console.log('this id data.feed.entry', data.feed.entry)
     let projects = data.feed.entry.map( d => {
       return {
          title: d.gsx$title.$t,
          image: d.gsx$image.$t,
          description: d.gsx$description.$t
       }
     })
     console.log('this is  projects', projects)
     createCards(projects)
})


class Card {
  constructor(obj) {
    this.title = obj.title
    this.image = obj.image
    this.description = obj.description
  }

  render() {
    const col = document.createElement('div')
    col.classList.add('col','s12','m3');

    const card = document.createElement('div')
    card.classList.add('card');

    const cardImage = document.createElement('div')
    cardImage.classList.add('card-image');

    const image  = document.createElement('img')
    image.setAttribute('src', this.image)

    const cardTitle = document.createElement('span')
    cardTitle.classList.add('card-title');
    cardTitle.innerText = this.title

    const cardContent = new CardContent(this.description)
    console.log('this is cardConten ', cardContent)
    cardImage.appendChild(image)
   card.appendChild(cardTitle)
    card.appendChild(cardImage)

    card.appendChild(cardContent.render())
    col.appendChild(card)

    return col
  }
}

class CardContent {
  constructor(desc) {
    this.desc = desc
  }
  render () {
    console.log('this is desc', this.desc)
    const cardContent = document.createElement('div')
    cardContent.classList.add('card-content');

    const paragraph = document.createElement('p')
    paragraph.innerText = this.desc

    cardContent.appendChild(paragraph)
    return cardContent
  }
}
function createCards(projects){
  const projectDiv = document.querySelector('#projectCards')
  projects.forEach( obj => {
    let card = new Card(obj)
    console.log('this is card', card)
    projectDiv.appendChild(card.render())
  })

}
