function submitPost(ev) {
  ev.preventDefault();

  const name = nameEl.value.trim();
  const content = contentEl.value.trim();
  console.log(name, content);
  if (!name.length || !content.length || name.length > 100) {
    window.alert(
      "UR MESSAGE, FACE, TITLE OR DUMBMOTHER IS R-WORD, GO BACK MONKE, OKE?"
    );
    return;
  }

  const postData = new FormData();
  postData.append("name", name);
  postData.append("content", content);
  console.log(postData);

  fetch("./php/pg_post.php", { method: "POST", body: postData }).then(() =>
    location.reload()
  );
}

async function getPosts() {
  const posts = await fetch("./php/pg_get_post.php").then((data) =>
    data.json()
  );
  for (const { id, name, content, timestamp } of posts) {
    const ts = new Date(timestamp);
    const post = `
      <article data-post-id="${id}">
          <header>
              <p class="timestamp">${ts.toLocaleString()}</p>
              <h1>${name}</h1>
          </header>
          <p>${content}</p>
          <div id="comments">
            <span class="clickable" onclick="addcomment(event,${id}); return false">Add comment</span>
            <span class="clickable" onclick="showComments(event,${id}); return false">Show comments</span>
          </div>
      </article>`;
    postsEl.innerHTML += post;
  }
}

getPosts();
