// Mock news data
export const mockNews = [
  {
    id: 1,
    title: "Scientists Discover New Cancer Treatment Method",
    shortDescription: "Researchers claim to have found a breakthrough treatment method that can effectively inhibit cancer cell growth.",
    fullDescription: "Latest research shows that researchers have discovered a new targeted treatment method that can effectively prevent cancer cell growth and spread by inhibiting the activity of specific proteins. This research has achieved significant results in laboratory settings, but further clinical trials are needed to verify its effectiveness and safety in humans.",
    reporter: "Zhang Ming",
    date: "2024-01-15T10:30:00",
    image: "https://example.com/images/cancer-research.jpg",
    votes: {
      fake: 34,
      real: 128
    },
    status: "real", // real, fake, undetermined
    comments: [
      {
        id: 1,
        content: "This is a very promising research, hoping it can enter clinical trials soon.",
        user: "Li Hua",
        vote: "real",
        date: "2024-01-15T11:20:00",
        image: ""
      },
      {
        id: 2,
        content: "This claim needs more scientific evidence to support it.",
        user: "Wang Qiang",
        vote: "fake",
        date: "2024-01-15T12:15:00",
        image: "https://example.com/images/evidence1.jpg"
      }
    ]
  },
  {
    id: 2,
    title: "A Brand of Beverage Contains Carcinogenic Substances",
    shortDescription: "A rumor circulating online claims that products from a well-known beverage brand contain carcinogenic substances, causing consumer panic.",
    fullDescription: "Recently, a message widely circulated on social media claiming that products from a well-known beverage brand contain the carcinogenic substance sodium benzoate. The news quickly attracted widespread attention and panic among consumers. However, after testing by authoritative agencies, all products of this brand comply with national food safety standards, and the content of sodium benzoate is within safe limits. Experts say that moderate intake of sodium benzoate is not harmful to human health.",
    reporter: "Zhao Jing",
    date: "2024-01-14T16:45:00",
    image: "https://example.com/images/drink-controversy.jpg",
    votes: {
      fake: 203,
      real: 56
    },
    status: "fake",
    comments: [
      {
        id: 3,
        content: "Authoritative agencies have already debunked this, it's fake news.",
        user: "Chen Chen",
        vote: "fake",
        date: "2024-01-14T17:30:00",
        image: ""
      },
      {
        id: 4,
        content: "I saw news that the test results were qualified.",
        user: "Liu Yang",
        vote: "fake",
        date: "2024-01-14T18:05:00",
        image: ""
      }
    ]
  },
  {
    id: 3,
    title: "New Electric Vehicle Battery Range Exceeds 1000 Kilometers",
    shortDescription: "A domestic technology company announces the development of new battery technology with a range exceeding 1000 kilometers.",
    fullDescription: "A leading domestic technology company announced today that they have successfully developed a new type of electric vehicle battery technology. This technology uses advanced solid-state battery materials, which not only increases energy density by 50% compared to traditional lithium batteries, but also shortens charging time to less than 15 minutes. In laboratory tests, the prototype car equipped with this battery achieved a range of 1050 kilometers, far exceeding mainstream electric vehicles currently on the market. The company plans to achieve mass production of this technology within the next two years.",
    reporter: "Wu Wei",
    date: "2024-01-13T09:15:00",
    image: "https://example.com/images/electric-car.jpg",
    votes: {
      fake: 78,
      real: 92
    },
    status: "undetermined",
    comments: [
      {
        id: 5,
        content: "This sounds impressive, but I need to see the actual product to believe it.",
        user: "Zheng Hao",
        vote: "undetermined",
        date: "2024-01-13T10:20:00",
        image: ""
      }
    ]
  },
  {
    id: 4,
    title: "Eating Bananas Can Prevent COVID-19",
    shortDescription: "Online rumors claim that eating more bananas can enhance immunity and prevent COVID-19 infection.",
    fullDescription: "Recently, a message appeared online claiming that eating more bananas can enhance human immunity and effectively prevent COVID-19 infection. The message also cites some so-called research data to support its claims. However, the World Health Organization has clearly stated that there is currently no scientific evidence that any food can prevent COVID-19 infection. Maintaining a balanced diet, regular work and rest, and appropriate exercise are effective ways to enhance immunity, but there is no such thing as a 'superfood'.",
    reporter: "Sun Yi",
    date: "2024-01-12T14:30:00",
    image: "https://example.com/images/bananas.jpg",
    votes: {
      fake: 312,
      real: 45
    },
    status: "fake",
    comments: [
      {
        id: 6,
        content: "Such claims without scientific basis are easy to mislead people.",
        user: "Zhou Ming",
        vote: "fake",
        date: "2024-01-12T15:10:00",
        image: ""
      },
      {
        id: 7,
        content: "Bananas are indeed rich in vitamins, but they cannot prevent COVID-19.",
        user: "Lin Xiaoyu",
        vote: "fake",
        date: "2024-01-12T15:45:00",
        image: ""
      }
    ]
  },
  {
    id: 5,
    title: "City Subways to Achieve Full 5G Signal Coverage",
    shortDescription: "Transportation authorities announce that all city subways will achieve full 5G signal coverage within the next three months.",
    fullDescription: "The Ministry of Transport held a press conference today to announce an important infrastructure upgrade plan. According to the plan, the subway systems of all cities nationwide will achieve full 5G signal coverage within the next three months. This will greatly improve the communication experience for subway passengers, supporting high-definition video calls, online gaming, and other high-speed data transmission needs. At the same time, the plan will also provide technical support for the intelligent operation of subway systems, including real-time passenger flow monitoring, intelligent dispatching and other functions.",
    reporter: "He Jian",
    date: "2024-01-11T11:00:00",
    image: "https://example.com/images/subway-5g.jpg",
    votes: {
      fake: 23,
      real: 156
    },
    status: "real",
    comments: [
      {
        id: 8,
        content: "Great! Now I can watch videos smoothly on the subway too.",
        user: "Xu Yang",
        vote: "real",
        date: "2024-01-11T12:20:00",
        image: ""
      }
    ]
  },
  {
    id: 6,
    title: "Cell Phone Radiation Causes Brain Tumors",
    shortDescription: "Long-term cell phone use increases brain tumor risk, experts recommend reducing usage time.",
    fullDescription: "An article published on social media claims that long-term use of cell phones producing electromagnetic radiation significantly increases the risk of developing brain tumors. The article also cites some so-called research data and cases. However, multiple studies by the World Health Organization and the International Agency for Research on Cancer show that there is currently no conclusive scientific evidence of a causal relationship between cell phone radiation and brain tumors. Cell phone radiation is a type of non-ionizing radiation, and its energy is not sufficient to damage DNA or cause cancer. Nevertheless, experts still recommend moderate cell phone use and maintaining a healthy lifestyle.",
    reporter: "Ma Chao",
    date: "2024-01-10T16:20:00",
    image: "https://example.com/images/cell-phone-radiation.jpg",
    votes: {
      fake: 187,
      real: 67
    },
    status: "fake",
    comments: [
      {
        id: 9,
        content: "The World Health Organization has debunked this many times, cell phone radiation does not cause brain tumors.",
        user: "Gao Feng",
        vote: "fake",
        date: "2024-01-10T17:30:00",
        image: "https://example.com/images/who-statement.jpg"
      }
    ]
  }
];

// Get all news
export const getAllNews = () => {
  return mockNews;
};

// Get news by ID
export const getNewsById = (id) => {
  return mockNews.find(news => news.id === parseInt(id));
};

// Filter news by status
export const getNewsByStatus = (status) => {
  if (!status || status === 'all') return mockNews;
  return mockNews.filter(news => news.status === status);
};

// Update news vote
export const updateNewsVote = (newsId, voteType) => {
  const news = getNewsById(newsId);
  if (news && (voteType === 'fake' || voteType === 'real')) {
    news.votes[voteType] += 1;
    // Update status
    if (news.votes.fake > news.votes.real * 1.5) {
      news.status = 'fake';
    } else if (news.votes.real > news.votes.fake * 1.5) {
      news.status = 'real';
    } else {
      news.status = 'undetermined';
    }
  }
  return news;
};

// Add comment
export const addComment = (newsId, comment) => {
  const news = getNewsById(newsId);
  if (news) {
    const newComment = {
      id: Date.now(),
      ...comment,
      date: new Date().toISOString()
    };
    news.comments.push(newComment);
    return newComment;
  }
  return null;
};