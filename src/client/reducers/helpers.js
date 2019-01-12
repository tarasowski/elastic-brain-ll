const byDate = (a, b) =>
    (new Date(a.dateAdded) - new Date(b.dateAdded))

export const sortBy = xs =>
    [...xs].sort(byDate)