import './NetworkingFeed.css'
import Sidebar from '../shared/Sidebar'
import TopNav from '../shared/TopNav'
import ChatBot from '../shared/ChatBot'
import { User, Heart, MessageCircle, Share2, Image, Video, Plus, ThumbsUp, MessageSquare, Forward, Camera, Calendar, MapPin, Users, Clock, Building, Briefcase } from 'lucide-react'

function NetworkingFeed() {
  const posts = [
    {
      id: 1,
      author: {
        name: "Alice Johnson",
        title: "Senior Software Engineer at TechCorp",
        time: "2h ago",
        avatar: "👩‍💻"
      },
      content: "Just wrapped up an amazing project on distributed systems! The team did incredible work. Always learning something new in this field.",
      hashtags: ["#DistributedSystems", "#SoftwareDevelopment"],
      image: "💻",
      stats: {
        likes: 194,
        comments: 23,
        shares: 11
      }
    },
    {
      id: 2,
      author: {
        name: "Bob Williams",
        title: "Marketing Director at Global Innovations",
        time: "7h ago",
        avatar: "👨‍💼"
      },
      content: "Excited to share insights from our latest market analysis report. Data-driven strategies are key to success! What are your thoughts on current market trends?",
      hashtags: ["#Marketing", "#MarketAnalysis", "#BusinessStrategy"],
      stats: {
        likes: 88,
        comments: 15,
        shares: 7
      }
    },
    {
      id: 3,
      author: {
        name: "Charlie Davis",
        title: "Product Manager at Innovate Solutions",
        time: "2h ago",
        avatar: "👨‍💻"
      },
      content: "Our new product feature is live! Huge shoutout to the engineering and design teams for their hard work and dedication. Check it out and let us know your feedback!",
      hashtags: ["#ProductLaunch", "#Innovation", "#Teamwork"],
      image: "🚀",
      stats: {
        likes: 210,
        comments: 45,
        shares: 18
      }
    }
  ]

  const suggestions = [
    { name: "Sarah Lee", title: "UX Designer", avatar: "👩‍🎨" },
    { name: "David Kim", title: "Data Scientist", avatar: "👨‍🔬" },
    { name: "Emily Chen", title: "Project Manager", avatar: "👩‍💼" }
  ]

  const jobs = [
    {
      title: "Full Stack Developer",
      company: "Byte Studio",
      location: "Remote • $120k-$150k",
      time: "Full-time",
      status: "1 week ago"
    },
    {
      title: "Content Strategist",
      company: "Design Agency",
      location: "San Francisco • $80k-$100k",
      time: "Full-time",
      status: "3 days ago"
    },
    {
      title: "Junior Data Analyst",
      company: "Analytics Hub",
      location: "New York • $70k-$85k",
      time: "Internship",
      status: "2 days ago"
    }
  ]

  const events = [
    {
      title: "AI in Business Summit",
      date: "October 28, 2024",
      location: "Virtual",
      type: "Conference",
      attendees: "500+ attending"
    },
    {
      title: "Networking Mixer: Tech Industry",
      date: "November 10, 2024",
      location: "London, UK",
      type: "Social",
      attendees: "150+ attending"
    },
    {
      title: "Blockchain Fundamentals Workshop",
      date: "December 5, 2024",
      location: "Online",
      type: "Workshop",
      attendees: "80+ attending"
    }
  ]

  return (
    <div className="networking-feed">
      <Sidebar activeSection="networking" />
      <TopNav title="Networking Feed" />
      <ChatBot activeSection="networking" />
      
      <main className="main-content">
        <div className="feed-container">
          <div className="feed-left">
            {/* Create Post Section */}
            <div className="create-post">
              <div className="create-post-header">
                <div className="user-avatar">👤</div>
                <input 
                  type="text" 
                  placeholder="What's on your mind, John?"
                  className="post-input"
                />
              </div>
              <div className="create-post-actions">
                <button className="action-btn">
                  <Image className="action-icon" />
                  Add Photo/Video
                </button>
                <button className="post-btn">Post</button>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="activity-section">
              <h2>Recent Activity</h2>
              
              {posts.map(post => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <div className="post-author">
                      <div className="author-avatar">{post.author.avatar}</div>
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
                        <div className="image-placeholder">{post.image}</div>
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
                    <button className="action-button">
                      <ThumbsUp className="action-icon" />
                      Like
                    </button>
                    <button className="action-button">
                      <MessageSquare className="action-icon" />
                      Comment
                    </button>
                    <button className="action-button">
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
                  <div className="suggestion-avatar">{person.avatar}</div>
                  <div className="suggestion-info">
                    <h4>{person.name}</h4>
                    <p>{person.title}</p>
                  </div>
                  <button className="connect-btn">Connect</button>
                </div>
              ))}
            </div>

            {/* Job Board */}
            <div className="job-board-section">
              <h3>Job Board</h3>
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
                    <button className="apply-btn">Apply Now</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Events */}
            <div className="events-section">
              <h3>Upcoming Events</h3>
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
                  <button className="event-btn">View Details</button>
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
