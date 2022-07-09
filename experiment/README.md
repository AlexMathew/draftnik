# Experiments on FPL API

[All static data](https://fantasy.premierleague.com/api/bootstrap-static/) - [Data](https://gist.github.com/AlexMathew/0878ee2f881da7bfc61f55f2d489bb3f)

[Team entry details](https://fantasy.premierleague.com/api/my-team/129364/) - [Data](https://gist.github.com/AlexMathew/2991627296a33a89bb442451e5d0f398)

[Fixtures](https://fantasy.premierleague.com/api/fixtures/?event=46) - [Completed event](https://gist.github.com/AlexMathew/a5ec8560388b5e419074e733c9bf543f) | [Unfinished event](https://gist.github.com/AlexMathew/6121fbc0f061933439588fca8d37903e)

[Jersey](https://fantasy.premierleague.com/dist/img/shirts/special/shirt_1-110.webp)

[GK jersey](https://fantasy.premierleague.com/dist/img/shirts/special/shirt_1_1-66.webp)

[Badge](https://fantasy.premierleague.com/dist/img/badges/badge_1_80.png)

[Player image](https://resources.premierleague.com/premierleague/photos/players/110x140/p176297.png)

## Draft preview on transfers page

```javascript
document.querySelectorAll('.Pitch__PitchUnit-sc-1mctasb-3').forEach(elem => elem.style.opacity = 0.2)
```

```javascript
document.querySelectorAll( '.Pitch__PitchUnit-sc-1mctasb-3' ).forEach( elem => {
    const newElem = elem.cloneNode( true );
    newElem.classList.add( "draftnik-preview" );
    newElem.style.marginTop = "-50%";
    newElem.style.marginLeft = "25%";
    elem.append( newElem )
} )
document.querySelectorAll( '.Pitch__PitchUnit-sc-1mctasb-3:not(.draftnik-preview) > .Pitch__PitchElementWrap-sc-1mctasb-4' ).forEach( elem => elem.style.opacity = 0.2 )
```

To just overwrite the squad displayed on screen -

```javascript
document.querySelectorAll( '.Pitch__PitchUnit-sc-1mctasb-3' ).forEach( elem => {
    const newElem = elem.cloneNode( true );
    newElem.classList.add( "draftnik-preview" );
    elem.append( newElem )
} )
document.querySelectorAll( '.Pitch__PitchUnit-sc-1mctasb-3:not(.draftnik-preview) > .Pitch__PitchElementWrap-sc-1mctasb-4' ).forEach( elem => elem.style.display = 'none' )
```

```javascript
document.querySelectorAll('.Pitch__PitchUnit-sc-1mctasb-3.draftnik-preview .Pitch__PrimaryControl-sc-1mctasb-7').forEach(button => button.style.display = 'none')
const search_icon_svg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15"><path fill="#000" d="M23,21.426892 L19.2716455,17.6969948 C19.8584878,16.8106243 20.1997648,15.7497557 20.1997648,14.6072129 C20.1997648,11.5125286 17.6927267,9.00445324 14.5998824,9.00445324 C11.5070381,9.00445324 9,11.5130889 9,14.6077732 C9,17.701337 11.5070381,20.2105329 14.5998824,20.2105329 C15.7412946,20.2105329 16.8028164,19.8680222 17.6883864,19.2814833 L21.4161809,23.0113805 L23,21.426892 Z M10.5866193,14.6083335 C10.5866193,12.3907612 12.3838013,10.5939562 14.5998964,10.5939562 C16.8165515,10.5939562 18.6137335,12.3907612 18.6137335,14.6083335 C18.6137335,16.8259058 16.8165515,18.6238314 14.5998964,18.6238314 C12.3838013,18.6238314 10.5866193,16.8259058 10.5866193,14.6083335 Z" transform="translate(-9 -8.85)"></path></svg>`
document.querySelectorAll('.Pitch__InfoControl-sc-1mctasb-8 .ElementStatus__InfoIcon-sc-1bs5tgy-0').forEach(button => button.innerHTML = search_icon_svg)
```

Disable "Make Transfers" button when viewing draft preview.

Colours:

Disabled

```css
    background: none rgb(237, 241, 249);
    color: rgb(122, 122, 122);
```

Enabled

```css
    background: rgb(150, 60, 255);
    color: white;
```

```javascript
function getByXpath(path, multiple = false) {
  const nodes = document.evaluate(
    path,
    document,
    null,
    multiple
      ? XPathResult.ORDERED_NODE_ITERATOR_TYPE
      : XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );

  return multiple ? nodes : nodes.singleNodeValue;
}
const transfersButton = getByXpath(`//button[contains(text(),'Make Transfers')]`);
transfersButton.disabled = true;
transfersButton.style.background = "rgb(237, 241, 249)";
transfersButton.style.color = "rgb(122, 122, 122)";
```
