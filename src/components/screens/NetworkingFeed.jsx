import './NetworkingFeed.css'
import Sidebar from '../shared/Sidebar'
import TopNav from '../shared/TopNav'
import ChatBot from '../shared/ChatBot'
import Notifications, { showNotification } from '../shared/Notifications'
import { User, Heart, MessageCircle, Share2, Image, Video, Plus, ThumbsUp, MessageSquare, Forward, Camera, Calendar, MapPin, Users, Clock, Building, Briefcase, Send } from 'lucide-react'
import { useState } from 'react'
import ava1 from '../../assets/ava1.png'
import ava2 from '../../assets/ava2.png'
import ava3 from '../../assets/ava3.png'
import testimonial3 from '../../assets/testimonial3.jpg'
import codeImg from '../../assets/code.png'

function NetworkingFeed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Alice Johnson",
        title: "Adventure Enthusiast & Coffee Lover",
        time: "2h ago",
        avatar: ava1
      },
      content: "Just got back from an incredible hiking trip in the mountains! Met some amazing people along the way and discovered the most beautiful sunrise spot. Anyone else love early morning adventures?",
      hashtags: ["#Adventure", "#Hiking", "#MorningVibes"],
      image: codeImg,
      stats: {
        likes: 194,
        comments: 23,
        shares: 11,
        isLiked: false,
        isShared: false
      }
    },
    {
      id: 2,
      author: {
        name: "Bob Williams",
        title: "Music Producer & Pizza Connoisseur",
        time: "7h ago",
        avatar: ava2
      },
      content: "Working on some new beats in the studio tonight! Music has this amazing way of bringing people together. What's everyone listening to lately? Drop your favorite tracks below!",
      hashtags: ["#Music", "#Beats", "#StudioLife"],
      stats: {
        likes: 88,
        comments: 15,
        shares: 7,
        isLiked: false,
        isShared: false
      }
    },
    {
      id: 3,
      author: {
        name: "Charlie Davis",
        title: "Photographer & Travel Blogger",
        time: "2h ago",
        avatar: ava3
      },
      content: "Captured some stunning shots during today's street photography walk! There's something magical about finding beauty in everyday moments. Who else loves exploring the city with a camera?",
      hashtags: ["#Photography", "#StreetArt", "#CityLife"],
      image: codeImg,
      stats: {
        likes: 210,
        comments: 45,
        shares: 18,
        isLiked: false,
        isShared: false
      }
    }
  ])

  const [newPost, setNewPost] = useState('')
  const [connections, setConnections] = useState([])

  const handleLike = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              stats: {
                ...post.stats,
                likes: post.stats.isLiked ? post.stats.likes - 1 : post.stats.likes + 1,
                isLiked: !post.stats.isLiked
              }
            }
          : post
      )
    )
    
    const post = posts.find(p => p.id === postId)
    if (!post.stats.isLiked) {
      showNotification('success', 'Post Liked!', `You liked ${post.author.name}'s post`)
    }
  }

  const handleShare = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              stats: {
                ...post.stats,
                shares: post.stats.isShared ? post.stats.shares - 1 : post.stats.shares + 1,
                isShared: !post.stats.isShared
              }
            }
          : post
      )
    )
  }

  const handleConnect = (personName) => {
    if (connections.includes(personName)) {
      setConnections(connections.filter(name => name !== personName))
      showNotification('info', 'Disconnected', `You disconnected from ${personName}`)
    } else {
      setConnections([...connections, personName])
      showNotification('success', 'Connected!', `You are now connected with ${personName}`)
    }
  }

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: {
          name: "You",
          title: "NexusHub Member",
          time: "now",
          avatar: ava3
        },
        content: newPost,
        hashtags: [],
        stats: {
          likes: 0,
          comments: 0,
          shares: 0,
          isLiked: false,
          isShared: false
        }
      }
      setPosts([post, ...posts])
      setNewPost('')
      showNotification('success', 'Post Created!', 'Your post has been shared with your network')
    }
  }

  const suggestions = [
    { name: "Sarah Lee", title: "Food Blogger & Gaming Enthusiast", avatar: ava1 },
    { name: "David Kim", title: "Movie Buff & Weekend Chef", avatar: ava2 },
    { name: "Emily Chen", title: "Yoga Instructor & Book Lover", avatar: testimonial3 }
  ]

  const jobs = [
    {
      title: "Weekend Photography Buddy",
      company: "Local Photo Club",
      location: "City Center • Free Activity",
      time: "Weekends",
      status: "1 week ago"
    },
    {
      title: "Board Game Night Host",
      company: "Community Center",
      location: "Downtown • Social Activity",
      time: "Every Friday",
      status: "3 days ago"
    },
    {
      title: "Hiking Group Member",
      company: "Adventure Seekers",
      location: "Various Trails • Outdoor Fun",
      time: "Flexible",
      status: "2 days ago"
    }
  ]

  const events = [
    {
      title: "Local Food Festival",
      date: "October 28, 2024",
      location: "Central Park",
      type: "Food & Fun",
      attendees: "500+ attending"
    },
    {
      title: "Movie Night Under the Stars",
      date: "November 10, 2024",
      location: "Outdoor Cinema",
      type: "Entertainment",
      attendees: "150+ attending"
    },
    {
      title: "Art & Craft Workshop",
      date: "December 5, 2024",
      location: "Community Studio",
      type: "Creative",
      attendees: "80+ attending"
    }
  ]

  return (
    <div className="networking-feed">
      <Sidebar activeSection="networking" />
      <TopNav title="Networking Feed" />
      <ChatBot activeSection="networking" />
      <Notifications />
      
      <main className="main-content">
        <div className="feed-container">
          <div className="feed-left">
            {/* Create Post Section */}
            <div className="create-post">
              <div className="create-post-header">
                <div className="user-avatar">
                  <img src={ava3} alt="User" />
                </div>
                <textarea 
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What fun thing are you up to today?"
                  className="post-input"
                  rows="3"
                />
              </div>
              <div className="create-post-actions">
                <button className="action-btn">
                  <Image className="action-icon" />
                  Add Photo/Video
                </button>
                <button className="post-btn" onClick={handleCreatePost}>
                  <Send className="action-icon" />
                  Post
                </button>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="activity-section">
              <h2>Recent Activity</h2>
              
              {posts.map(post => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <div className="post-author">
                      <div className="author-avatar">
                        <img src={post.author.avatar} alt={post.author.name} />
                      </div>
                      <div className="author-info">
                        <h3 className="author-name">{post.author.name}</h3>
                        <p className="author-title">{post.author.title}</p>
                        <span className="post-time">{post.author.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="post-content">
                    <p>{post.content}</p>
                    <div className="hashtags">
                      {post.hashtags.map((tag, index) => (
                        <span key={index} className="hashtag">{tag}</span>
                      ))}
                    </div>
                    
                    {post.image && (
                      <div className="post-image">
                        {(typeof post.image === 'string' && !post.image.includes('/assets/')) ? (
                          <div className="image-placeholder">{post.image}</div>
                        ) : (
                          <img src={post.image} alt="Post content" className="post-image-content" />
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="post-stats">
                    <div className="stat-item">
                      <ThumbsUp className="stat-icon" />
                      <span>{post.stats.likes} Likes</span>
                    </div>
                    <div className="stat-item">
                      <MessageSquare className="stat-icon" />
                      <span>{post.stats.comments} Comments</span>
                    </div>
                    <div className="stat-item">
                      <Forward className="stat-icon" />
                      <span>{post.stats.shares} Shares</span>
                    </div>
                  </div>
                  
                  <div className="post-actions">
                    <button 
                      className={`action-button ${post.stats.isLiked ? 'liked' : ''}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <ThumbsUp className="action-icon" />
                      Like
                    </button>
                    <button className="action-button">
                      <MessageSquare className="action-icon" />
                      Comment
                    </button>
                    <button 
                      className={`action-button ${post.stats.isShared ? 'shared' : ''}`}
                      onClick={() => handleShare(post.id)}
                    >
                      <Forward className="action-icon" />
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="feed-right">
            {/* People You May Know */}
            <div className="suggestions-section">
              <h3>People You May Know</h3>
              {suggestions.map((person, index) => (
                <div key={index} className="suggestion-card">
                  <div className="suggestion-avatar">
                    <img src={person.avatar} alt={person.name} />
                  </div>
                  <div className="suggestion-info">
                    <h4>{person.name}</h4>
                    <p>{person.title}</p>
                  </div>
                  <button 
                    className={`connect-btn ${connections.includes(person.name) ? 'connected' : ''}`}
                    onClick={() => handleConnect(person.name)}
                  >
                    {connections.includes(person.name) ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>

            {/* Activity Groups */}
            <div className="job-board-section">
              <h3>Activity Groups</h3>
              {jobs.map((job, index) => (
                <div key={index} className="job-card">
                  <div className="job-header">
                    <h4 className="job-title">{job.title}</h4>
                    <p className="job-company">{job.company}</p>
                  </div>
                  <div className="job-details">
                    <span className="job-location">{job.location}</span>
                    <span className="job-type">{job.time}</span>
                  </div>
                  <div className="job-actions">
                    <span className="job-time">{job.status}</span>
                    <button className="apply-btn">Join Group</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Fun Events */}
            <div className="events-section">
              <h3>Fun Events</h3>
              {events.map((event, index) => (
                <div key={index} className="event-card">
                  <div className="event-header">
                    <h4 className="event-title">{event.title}</h4>
                    <span className="event-type">{event.type}</span>
                  </div>
                  <div className="event-details">
                    <div className="event-detail">
                      <Calendar className="detail-icon" />
                      <span>{event.date}</span>
                    </div>
                    <div className="event-detail">
                      <MapPin className="detail-icon" />
                      <span>{event.location}</span>
                    </div>
                    <div className="event-detail">
                      <Users className="detail-icon" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                  <button className="event-btn">Join Event</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NetworkingFeed
