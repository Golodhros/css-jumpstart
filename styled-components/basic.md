Docs: https://styled-components.com/docs

# Features
* Automatic vendor prefixing
* Unique class names
* Dead styles elimination
* Automatic critical CSS
* Nesting of styles

# Install
```
npm install --save styled-components
yarn add styled-components
```

Also the [babel plugin](https://github.com/styled-components/babel-plugin-styled-components).


# Usage
Use styled with:

```jsx
import styled, { css } from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;


  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`
```

Using css from styled-components we can interpolate a function into our template literal, which gets passed the props of our component. When the primary property is set we want to add some more css to our component.

## Using prefixed props
Styling props do not need the $ prefix, but is recommendable. Props with names prefixed with ‘$’, called transient props, are only used by the defined Styled Component and are not passed down to the underlying component.
```jsx
import styled, { css } from 'styled-components’;

const SuccessButton = styled(Button)`
  ${props =>
    props.$success
      ? css`
          background-color: #28a745;
          :hover {
            background-color: #218838;
          }
        `
      : ''}
`;const App = () => {
  return (
    <SuccessButton
      $success
      onClick={() => alert('clicked!')}
      type="button"
    >
        Success
    </SuccessButton>
  );
};
```

## Using attrs
```jsx
const StyledContainer = styled.section.attrs((props) => ({
  width: props.width || "100%",
  hasPadding: props.hasPadding || false,
}))`
  --container-padding: 20px;
  width: ${(props) => props.width}; // Falls back to 100%
  padding: ${(props) =>
    (props.hasPadding && "var(--container-padding)") || "none"};
`;
```

## Overriding styles
We can use the ’styled’ component factory to extend existing styles. It will take an existing Styled Component and return a new one with overriding styles:
```jsx
const StyledContainer = styled.section`
  max-width: 1024px;
  padding: 0 20px;
  margin: 0 auto;
`;


// Inherit StyledContainer in StyledSmallConatiner
const StyledSmallContainer = styled(StyledContainer)`
  padding: 0 10px;
`;


function Home() {
  return (
    <StyledContainer>
      <h1>The secret is to be happy</h1>
    </StyledContainer>
  );
}


function Contact() {
  return (
    <StyledSmallContainer>
      <h1>The road goes on and on</h1>
    </StyledSmallContainer>
  );
}
```

We can also use the styled component factory to extend a React component.

## Composing Styles
We can define reusable styles that can be composed by using the css helper to create a template literal:
```jsx
const blackFont = css`
  color: black;
`;const WarningButton = styled(Button)`
  background-color: #ffc107;
  :hover {
    background-color: #e0a800;
  }
  ${blackFont}
`;
```

## Overriding elements
With the as polymorphic prop, you can swap the end element that gets rendered:
```jsx
function Home() {
  return (
    <StyledContainer>
      <h1>It’s business, not personal</h1>
    </StyledContainer>
  );
}


function Contact() {
  return (
    <StyledSmallContainer as="div">
      <h1>Never dribble when you can pass</h1>
    </StyledSmallContainer>
  );
}
```

## Referencing previous elements
Sometimes you want a child element’s styling to change when a parent is hovered.
```jsx
const Link = styled.a`
  color: purple;
`;
  
const Icon = styled.svg`
  width: 48px;
  height: 48px;


  ${Link}:hover & {
    fill: red;
  }
`;
```

## Nested Styles
```jsx
const StyledProfileCard = styled.div`
  border: 1px solid black;


  > .username {
    font-size: 20px;
    color: black;
    transition: 0.2s;


    &:hover {
      color: red;
    }


    + .dob {
      color: grey;
    }
  }
`;


function ProfileCard() {
  return (
    <StyledProfileCard>
      <h1 className="username">John Doe</h1>
      <p className="dob">
        Date: <span>12th October, 2013</span>
      </p>
      <p className="gender">Male</p>
    </StyledProfileCard>
  );
}
```

## Animation
Styled components have a keyframes helper that assists with constructing (reusable) animation keyframes:
```jsx
import styled, {keyframes} from "styled-components";


const slideIn = keyframes`
  from {
    opacity: 0;
  }


  to {
    opacity: 1;
  }
`;


const Toast = styled.div`
  animation: ${slideIn} 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
  border-radius: 5px;
  padding: 20px;
  position: fixed;
`;
```

## Global Styles
There is a helper function — createGlobalStyle — whose sole reason for existence is global styling.
```jsx
import {createGlobalStyle} from "styled-components";


const GlobalStyle = createGlobalStyle`
    /* Your css reset here */
`;


// Use your GlobalStyle
function App() {
  return (
    <div>
      <GlobalStyle />
      <Routes />
    </div>
  );
}
```

We would use this to:
* Target things outside the root render (html, body, etc.)
* Styling without rendering any element

## Multiple conditional styles
We can do it using the css helper:
```jsx
const StyledTextField = styled.input`
width: 100%;
height: 40px;


// 1. Empty state
${(props) =>
  props.empty &&
  css`
    color: none;
    backgroundcolor: white;
  `}


// 2. Active state
${(props) =>
  props.active &&
  css`
    color: black;
    backgroundcolor: whitesmoke;
  `}


// 3. Filled state
${(props) =>
  props.filled &&
  css`
    color: black;
    backgroundcolor: white;
    border: 1px solid green;
  `}
`;
```

## Theming
We can create a theme with the main properties. It will be a plain JS object.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider } from "styled-components";

const theme = {
  primary: 'red'
};

const Card = styled.div`
  max-width: 350px;
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  border: 1px solid ${props => props.theme.primary};
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  margin: 30px auto;
  img {
    max-width: 100%;
  }
`;

const GlobalStyles = styled.div`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.primary};
`;

const SocialCard = () => (
  <Card>
    <img src={Image} alt="Sample image" />
    {/* Content goes here */}
  </Card>
);

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles>
      <SocialCard />
    </GlobalStyles>
  </ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("app"));
```

These theme variables can be used in any of our components since the ThemeProvider is wrapped around our entire application.

## Internals
What is happening:
1. At render, Styled Components will generate a unique classname based on the styles
2. Styled components will inject a style tag into the HTML head using that same classname
3. Styled components will render the element with the unique classname


References
* Introduction - https://www.smashingmagazine.com/2020/07/styled-components-react/
* Theming - https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/
* Best Practices
    * General - https://medium.com/javascript-in-plain-english/the-modern-way-to-style-with-styled-components-c3c51b750b5f
    * HOCs - https://medium.com/bojagi/spice-up-styled-components-with-currying-6c858172649d
