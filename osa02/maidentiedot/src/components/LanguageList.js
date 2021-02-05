import React from 'react'

const LanguageList = ({ languageList }) => {

  return (
    <ul>
      {languageList.map(language =>
        <li key={language.iso639_1}>
          {language.name}
        </li>
      )}
    </ul>
  )
}

export default LanguageList