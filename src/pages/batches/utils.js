export const DateFormat = date => {
  const startFormatDate = new Date(date * 1000).toLocaleString().split(",")
  const parts = startFormatDate[0].split("/")
  return `${parts[2]}-${parts[1]}-${parts[0]}`
}

export const formatFunction = editData => {
  return {
    // created_at: "",
    // updated_at: "",
    // deleted_at: "",
    unikodecourseid: editData?.id.toString(),
    name: editData?.fullname,
    description: editData?.displayname,
    // course: "",
    // variant_type: "",
    // class_link: "",
    // learner_limit: "",
    // unikodecourseid: "",
    start_date: DateFormat(editData?.startdate),
    // last_sync: "",
    // syncing_status: "",
    // end_date: "",
    // lectures: "",
    // progress: "",
    // enable: "",
    // batch_schedule: {
    //   name: "",
    //   value: [],
    // },
    // batch_mentors: [],
    // created_by: "",
  }
}
