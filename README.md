# YouTube Popular Videos Analytics

A full-stack React and Node.js application that displays the most popular YouTube videos from the past week. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Real-time YouTube Data**: Fetches the latest popular videos using YouTube Data API v3
- **Time-based Filtering**: Shows videos published in the last 7 days
- **Popularity Sorting**: Videos sorted by view count (most popular first)
- **Rich Video Information**: Displays thumbnails, titles, descriptions, view counts, likes, and channel info
- **Responsive Design**: Mobile-first design that works on all devices
- **Fast Performance**: Server-side API routes with client-side rendering
- **Modern UI**: Clean interface built with shadcn/ui components

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Next.js 14** - Full-stack React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **YouTube Data API v3** - Official YouTube API for video data
- **Node.js** - JavaScript runtime

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- A Google Cloud Platform account
- YouTube Data API v3 enabled
- YouTube Data API key

## 🔧 Setup Instructions

### 1. Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd youtube-popular-videos
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 3. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3
4. Create credentials (API Key)
5. Restrict the API key to YouTube Data API v3 (recommended)

### 4. Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
YOUTUBE_API_KEY=your_youtube_api_key_here
\`\`\`

### 5. Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   └── youtube/
│   │       └── popular/
│   │           └── route.ts          # YouTube API endpoint
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Main page component
├── components/
│   └── ui/                          # shadcn/ui components
├── lib/
│   ├── utils.ts                     # Utility functions
│   └── youtube.ts                   # YouTube API client
└── README.md
\`\`\`

## 🔌 API Endpoints

### GET `/api/youtube/popular`

Fetches the most popular YouTube videos from the past week.

**Response Format:**
\`\`\`json
{
  "videos": [
    {
      "id": "video_id",
      "title": "Video Title",
      "description": "Video description...",
      "thumbnail": "https://img.youtube.com/vi/video_id/maxresdefault.jpg",
      "viewCount": "1234567",
      "likeCount": "12345",
      "commentCount": "1234",
      "publishedAt": "2024-01-15T10:30:00Z",
      "channelTitle": "Channel Name",
      "channelId": "channel_id",
      "duration": "PT10M30S",
      "url": "https://www.youtube.com/watch?v=video_id"
    }
  ],
  "totalResults": 20
}
\`\`\`

**Query Parameters:**
- `maxResults` (optional): Number of videos to return (default: 20, max: 50)
- `regionCode` (optional): ISO 3166-1 alpha-2 country code (default: 'US')

## 🎨 UI Components

The application uses several key components:

- **VideoCard**: Displays individual video information with thumbnail, stats, and metadata
- **VideoGrid**: Responsive grid layout for video cards
- **LoadingSpinner**: Shows loading state while fetching data
- **ErrorMessage**: Displays error messages when API calls fail

## 🔍 How It Works

1. **Data Fetching**: The app calls the YouTube Data API v3 to search for videos
2. **Filtering**: Videos are filtered to show only those published in the last 7 days
3. **Sorting**: Results are sorted by view count in descending order
4. **Display**: Videos are rendered in a responsive grid with rich metadata

### YouTube API Query Details

The application uses the following YouTube API parameters:

- **part**: `snippet,statistics,contentDetails`
- **chart**: `mostPopular`
- **publishedAfter**: Current date minus 7 days
- **order**: `viewCount`
- **type**: `video`
- **videoDuration**: `any`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the `YOUTUBE_API_KEY` environment variable in Vercel dashboard
4. Deploy automatically

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Next.js build command
- **Railway**: Direct deployment from GitHub
- **DigitalOcean App Platform**: Container or static site deployment

## 🔒 Security Considerations

- **API Key Protection**: Never expose your YouTube API key in client-side code
- **Rate Limiting**: YouTube API has quota limits (10,000 units/day by default)
- **CORS**: API routes are protected by Next.js built-in CORS handling
- **Environment Variables**: Use `.env.local` for local development, platform environment variables for production

## 📊 API Quotas and Limits

YouTube Data API v3 has the following limits:

- **Daily Quota**: 10,000 units per day (default)
- **Search Cost**: 100 units per request
- **Video Details Cost**: 1 unit per video
- **Rate Limit**: 100 requests per 100 seconds per user

## 🐛 Troubleshooting

### Common Issues

1. **"API key not valid"**
   - Check if your API key is correct
   - Ensure YouTube Data API v3 is enabled
   - Verify API key restrictions

2. **"Quota exceeded"**
   - You've hit the daily API quota limit
   - Wait for quota reset or request quota increase

3. **No videos showing**
   - Check if there are popular videos in the last week
   - Try different region codes
   - Verify API response in browser dev tools

### Debug Mode

Add `console.log` statements in the API route to debug:

\`\`\`typescript
console.log('API Response:', response.data);
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [YouTube Data API v3](https://developers.google.com/youtube/v3) for providing video data
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Next.js](https://nextjs.org/) for the amazing full-stack framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## 📞 Support

If you have any questions or need help, please:

1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed information
4. Contact the maintainers

---

**Built with ❤️ using React, Next.js, and YouTube Data API**
