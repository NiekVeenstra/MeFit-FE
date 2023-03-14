import React from 'react'

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if(!exerciseVideos.length) return 'loading...';

  return (
    <div>
        Watch {name} exercise videos.
        <div>
            {exerciseVideos?.slice(0, 3).map((item, index) => (
                <a 
                key={index} 
                href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                target="_blank"
                rel="noreferrer"
                >
                    <img src={item.video.thumbnails[0].url} alt={item.video.title} />
                    {item.video.title}
                </a>
            ))}
        </div>
    </div>
  )
}

export default ExerciseVideos