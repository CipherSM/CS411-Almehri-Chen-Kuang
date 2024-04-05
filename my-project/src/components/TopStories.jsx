function TopStories() {
  // Dummy data for the stories
  const stories = new Array(9).fill(null).map((_, index) => ({
    id: index,
    title: `Story ${index + 1}`,
    content: `Content for story ${index + 1}.`,
  }));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "20px",
        padding: "20px",
        margin: "0 auto", // Center the grid within its container
        // No specific height is set to let the content determine the height
      }}
    >
      {stories.map((story) => (
        <div
          key={story.id}
          style={{
            backgroundColor: "#ffffff", // Light background for the story card
            padding: "10px",
            boxSizing: "border-box",
            borderRadius: "8px", // Rounded corners for the story cards
            border: "1px solid #ddd", // Border for the story cards
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start", // Align text to the start/left
            minHeight: "150px", // Minimum height for the story card
          }}
        >
          <h3>{story.title}</h3>
          <p>{story.content}</p>
        </div>
      ))}
    </div>
  );
}

export default TopStories;
