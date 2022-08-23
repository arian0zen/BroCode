const TODOIST_API_ENDPOINT = 'https://api.todoist.com/rest/v1'
const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql'
const DAILY_CODING_CHALLENGE_QUERY = `
query questionOfToday {
	activeDailyCodingChallengeQuestion {
		date
		userStatus
		link
		question {
			acRate
			difficulty
			freqBar
			frontendQuestionId: questionFrontendId
			isFavor
			paidOnly: isPaidOnly
			status
			title
			titleSlug
			hasVideoSolution
			hasSolution
			topicTags {
				name
				id
				slug
			}
		}
	}
}`
/**
* Sync LeetCode daily coding challenge to Todoist
*/
const syncLeetCodeCodingChallenge = async () => {
  const question = await fetchDailyCodingChallenge()
  console.log(question);
}


const fetchDailyCodingChallenge = async () => {
  console.log(`Fetching daily coding challenge from LeetCode API.`)

  const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
  }

  const response = await fetch(LEETCODE_API_ENDPOINT, init)
  console.log(response.json());
  return response.json()
}

fetchDailyCodingChallenge();


// const createTodoistTask = async (question) => {
//   const questionInfo = question.data.activeDailyCodingChallengeQuestion;
//   console.log(questionInfo);

 
// }