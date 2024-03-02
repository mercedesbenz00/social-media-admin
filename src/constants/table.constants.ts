export const tableConsts = {
  categories: {
    table: {
      name: "Name",
      createdAt: "Date",
      groupCount: "GroupCount",
      action: "Action",
      edit: "Edit",
      remove: "Remove"
    }
  },
  groups: {
    table: {
      name: "Name",
      membersCount: "Members",
      postsCount: "Posts",
      createdAt: "Date",
      action: "Action",
      edit: "Edit",
      remove: "Remove"
    }
  },
  persons: {
    table: {
      name: "Name",
      city: "Location",
      emai: "Email",
      action: "Action",
      reject: "Reject",
      verify: "Verify"
    }
  },
  bannedPersons: {
    table: {
      name: "Name",
      city: "Location",
      email: "Email",
      action: "Action",
      reject: "Reject",
      verify: "Verify",
      unban: "UnbanPerson"
    }
  },
  reportedUsers: {
    table: {
      name: "Name",
      date: "Date Of Join",
      posts_count: "Posts Count",
      reported_items: "Total Reported Times",
      status: "Ban Status",
      last_report: "Last Report Date"
    }
  },
  complaints: {
    table: {
      name: "Reporting User",
      reasons: "Reasons",
      description: "Description",
      date: "Date Of Reporting User"
    }
  }
}

export default tableConsts