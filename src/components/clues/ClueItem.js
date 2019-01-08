import React from 'react'

const ClueItem = ({clue}) => {
  return <li>{`${clue.label}. ${clue.text}`}</li>
}

export default ClueItem