export function GetDictionariesList() {
    return fetch("/dictionary/list", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        if (! response.ok) {
            throw new Error(response.status +' - '+ response.statusText);
        }
        return response.json();
    })
}

export function RemoveDictionary(id) {
    return fetch(`/dictionary/remove/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
      }).then((response) => {
        if (! response.ok) {
          throw new Error(response.status +' - '+ response.statusText);
        }
        return response.json();
      })
}


export function CreateDictionary(dictionaryName) {
    return fetch("/dictionary/create", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: dictionaryName,
        })
      }).then((response) => {
        if (! response.ok) {
          throw new Error(response.status +' - '+ response.statusText);
        }
        return response.json();
      })
}


export function AddWord(w, id) {
  return fetch("/dictionary/words", {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dictionaryID:  id,
      word:          w.word,
      translation:   w.translation,
      transcription: w.transcription,
  })
  }).then((response) => {
    if (! response.ok) {
      throw new Error(response.status +' - '+ response.statusText);
    }
    return response.json();
  })
}

export function RemoveWord(dictionaryID, wordID) {
  return fetch(`/dictionary/words`,{
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dictionaryID: dictionaryID,
      wordID: wordID,
    })
  }).then((response) => {
    if (! response.ok) {
      throw new Error(response.status +' - '+ response.statusText);
    }
    return response.json();
  })
}

export function GetWords(dictionaryID, page) {
  return fetch(`/dictionary/words/${dictionaryID}`,{
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (! response.ok) {
      throw new Error(response.status +' - '+ response.statusText);
    }
    return response.json();
  })
}

