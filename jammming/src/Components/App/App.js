import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

function App(props) {
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState('My Playlist')
  const [playlistTracks, setPlaylistTracks] = useState([])

  const addTrack = (track) => {
    let tracks = playlistTracks

    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    setPlaylistTracks(tracks)
  }

  const removeTrack = (track) => {
    let tracks = playlistTracks

    tracks = tracks.filter(savedTrack => savedTrack.id !== track.id)
    setPlaylistTracks(tracks)
  }

  const updatePlaylistName = (name) => {
    setPlaylistName(name)
  }

  const savePlaylist = () => {
    const trackUris = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName('New Playlist')
      setPlaylistTracks([])
    })
  }

  const search = (term) => {
    Spotify.search(term).then(searchResult => {
      setSearchResults(searchResult)
    })
  }

  return (
    <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={search} />
          <div className="App-playlist">
            <SearchResults searchResults={searchResults}
               onAdd={addTrack} />
            <Playlist playlistName={playlistName} 
              playlistTracks={playlistTracks} 
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist} />
          </div>
        </div>
      </div>
  );
}

export default App;
