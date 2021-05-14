const REST_DATA = [
  {
    id: "idtext7",
		description: "Working on a longer period time frame allows for better estimation of a task's complexity",
    title: "title7",
    team: "team",
    attach: 5,
    status: "Complete",
    score: { days: 15, colors: { bg: "#FFEEEF", text: "#FC5A5A" } },
    line: "70",
		subTaskList: [
			{ complete: true, id: 'genstring', itemText: "ajghm" }
		],
    type: "Backlog",
    users: [{
      size: 32,
      name: "SF",
      color: "#FFC542",
    }]
  },
  {
    id: "idtext8",
		description: "Break tasks into smaller tasks to identify the scope of a larger goal",
    title: "title8",
    team: "team",
    attach: 5,
    status: "Complete",
    score: { days: 15, colors: { bg: "#FFEEEF", text: "#FC5A5A" } },
    line: "100",
		subTaskList: [],
    type: "Backlog",
    users: [{
      size: 32,
      name: "UL",
      color: "#FFC542",
    }]
  },
  {
    id: "idtext9",
		description: "Attach a larger goal to milestones. Milestones allow for analyzing cost expenditure and revenue to engineering timeframes and business cycles.",
    title: "title9",
    team: "team",
    attach: 5,
    status: "5/8",
    score: { days: 15, colors: { bg: "#FFEEEF", text: "#FC5A5A" } },
    line: "100",
		subTaskList: [],
		type: "Backlog",
    users: [{
      size: 32,
      name: "UL",
      color: "#FFC542",
    }]
  }
]

export { REST_DATA };
