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

export function formatDateFR(dateString: string) {
    // Convert the input string to a Date object
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    // Retourner la date formatée en JJ/MM/AAAA
    return `${day}/${month}/${year}`;
}
