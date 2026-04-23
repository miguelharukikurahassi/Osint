import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query, type } = await request.json();

    // 1. Input Sanitization (Basic Example)
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Invalid query provided.' }, { status: 400 });
    }
    
    // Clean input to prevent basic injection
    const sanitizedQuery = query.trim().replace(/[<>"']/g, '');

    // 2. Route to the specific OSINT module
    let resultData;

    switch (type) {
      case 'username':
        resultData = await handleUsernameSearch(sanitizedQuery);
        break;
      case 'email':
        resultData = await handleEmailSearch(sanitizedQuery);
        break;
      // Implement domain, ip...
      default:
        return NextResponse.json({ error: 'Invalid search type.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      query: sanitizedQuery,
      type,
      data: resultData
    });

  } catch (error: any) {
    console.error("OSINT Search Error:", error);
    // Do not leak internal errors/API keys to the client!
    return NextResponse.json({ error: 'An error occurred during the investigation.' }, { status: 500 });
  }
}

// ---------------------------------------------------------
// Example Modules (In a real app, put these in src/lib/)
// ---------------------------------------------------------

async function handleUsernameSearch(username: string) {
  // This function demonstrates checking a single API like Github
  // Note: For real OSINT, we would check multiple platforms in parallel using Promise.all()
  
  const results: any = {
    platforms_checked: ['GitHub'],
    found: []
  };

  try {
    // We are running this securely on the server, so we can use API Keys here
    // const GITHUB_TOKEN = process.env.GITHUB_API_KEY; 
    
    const githubRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'User-Agent': 'OSINT-Tool-Core',
        // 'Authorization': `Bearer ${GITHUB_TOKEN}` // Uncomment when key is available
      }
    });

    if (githubRes.status === 200) {
      const data = await githubRes.json();
      results.found.push({
        platform: 'GitHub',
        url: data.html_url,
        name: data.name,
        bio: data.bio,
        public_repos: data.public_repos
      });
    } else {
      results.found.push({
        platform: 'GitHub',
        status: 'Not Found or Rate Limited'
      });
    }
  } catch (e) {
    // Silently fail or log internal
  }

  return results;
}

async function handleEmailSearch(email: string) {
  // Placeholder for HaveIBeenPwned or similar
  // Example using environment variable securely:
  // const HIBP_KEY = process.env.HIBP_API_KEY;
  // if (!HIBP_KEY) throw new Error("Missing API Key");

  return {
    message: "Email search module requires a valid API key (e.g. HIBP) configured in .env.local.",
    email_target: email
  };
}
