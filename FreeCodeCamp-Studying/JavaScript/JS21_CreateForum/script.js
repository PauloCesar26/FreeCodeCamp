const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";
const postsContainer = document.getElementById("posts-container");

// To populate the forum leaderboard with data, need to request the data from an API
// this is know as an asynchronous operation, which means that tasks execute independently of the main program flow
const fetchData = async () => {
    try{
        const res = await fetch(forumLatest);
        const data = await res.json();

        showLatestPosts(data);
    }
    catch(err){
        console.log(err);
    }
};

const timeAgo = (time) => {
    const currentTime = new Date(); //the current date and time
    const lastPost = new Date(time); //will be the date of the last activity on a topic

    const minutes = Math.floor((currentTime - lastPost) / 60000);
    const hours = Math.floor((currentTime - lastPost) / 3600000);
    const days = Math.floor((currentTime - lastPost) / 86400000);

    if(minutes < 60){
        return `${minutes}m ago`;
    }
    if(hours < 24){
        return `${hours}h ago`;
    }
    else{
        return `${days}d ago`;
    }
};

const showLatestPosts = (data) => {
    const {topic_list, users} = data;
    const { topics } = topic_list;

    topics.map(item => {
        postsContainer.innerHTML = item;
    });

    postsContainer.innerHTML = topics.map((item) => {
        const { 
            id, 
            title , 
            views, 
            posts_count, 
            slug, 
            posters, 
            category_id, 
            bumped_at 
        } = item;

        
        return `<tr>
            <td>
                <p class="post-title">${title}</p>
            </td>
            <td></td>
            <td>
                ${posts_count - 1}
            </td>
            <td>
                ${views}
            </td>
            <td>
                ${timeAgo()}
            </td>
        </tr>`;
    }).join("");
};
