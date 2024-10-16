export function formatDate(dateString: string) {
    // Convert the input string to a Date object
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }); 
    const year = date.getFullYear();

    // Return formatted date
	// Output: 9 Oct 2024
    return `${day} ${month} ${year}`;
}
