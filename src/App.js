import React, { useState } from 'react';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false); // State to track file selection

  // Separate state for bookmarked videos
  const [bookmarkedVideos, setBookmarkedVideos] = useState([]);

  // Function to handle adding videos
  const handleAddVideos = (event) => {
    event.preventDefault();
    const files = Array.from(event.target.videoFile.files);

    const newVideos = files.map((file, index) => ({
      id: index,
      name: file.name,
      url: URL.createObjectURL(file),
      bookmarked: false
    }));

    setVideos(prevVideos => [...prevVideos, ...newVideos]);
    setIsFileSelected(false); // Reset file selection state

    event.target.reset();
  };

  // Function to handle file selection change
  const handleFileChange = (event) => {
    setIsFileSelected(event.target.files.length > 0);
  };

  // Function to handle playing video in modal
  const handlePlayVideo = (videoUrl) => {
    setModalVideoUrl(videoUrl);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setModalVideoUrl('');
  };

  // Function to handle toggling bookmark status for a specific video
  const handleToggleBookmark = (id) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === id ? { ...video, bookmarked: !video.bookmarked } : video
      )
    );
  };

  // // Function to filter videos based on bookmarked status
  // const filteredVideos = showBookmarked ? videos.filter(video => video.bookmarked) : videos;

  // Function to handle showing bookmarked videos separately
  const handleShowBookmarkedVideos = () => {
    setBookmarkedVideos(videos.filter(video => video.bookmarked));
    setShowBookmarked(true);
  };

  // Function to handle showing all videos
  const handleShowAllVideos = () => {
    setShowBookmarked(false);
  };

  return (
    <div className="container">
      <h1>My Video Library</h1>

      {/* Form to add videos */}
      <form onSubmit={handleAddVideos}>
        <input type="file" id="videoFile" accept="video/*" multiple onChange={handleFileChange} />
        {isFileSelected && <button type="submit">Upload</button>} {/* Conditionally render upload button */}
      </form>

      {/* List of uploaded videos */}
      <div id="videoList">
        {videos.map(video => (
          <div key={video.id} className="video-item">
            <h3>{video.name}</h3>
            <button onClick={() => handlePlayVideo(video.url)}>Play</button>
            <button onClick={() => handleToggleBookmark(video.id)}>
              {video.bookmarked ? 'Bookmarked' : 'Add to Bookmark'}
            </button>
          </div>
        ))}
      </div>

      {/* Modal for video playback */}
      {modalVideoUrl && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <video controls className="video-player">
              <source src={modalVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Filter for bookmarked movies */}
      <div className="filter">
        <button onClick={handleShowAllVideos}>Show All Videos</button>
        <button onClick={handleShowBookmarkedVideos}>Show Bookmarked Videos</button>
      </div>

      {/* Conditional rendering of bookmarked videos */}
      {showBookmarked && (
        <div id="bookmarkedVideoList">
          <h2>Bookmarked Videos</h2>
          {bookmarkedVideos.map(video => (
            <div key={video.id} className="video-item">
              <h3>{video.name}</h3>
              <button onClick={() => handlePlayVideo(video.url)}>Play</button>
              <button onClick={() => handleToggleBookmark(video.id)}>
                Remove Bookmark
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
