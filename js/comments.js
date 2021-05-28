function addcomment(ev, id) {
  const commentinput = `
      <form onsubmit="submitComment(event,${id}); return false">
        <textarea placeholder="shit" rows="5"></textarea>
        <button type="submit"><span>Submit</span></button>
      </form>
      `;
  const node = ev.target.parentNode;
  ev.target.remove();
  node.innerHTML += commentinput;
}

function submitComment(ev, id) {
  ev.preventDefault();
  console.log(ev.target);
  const content = ev.target.querySelector("textarea").value;
  console.log(content);
  const postData = new FormData();
  postData.append("content", content);
  postData.append("post_id", id);
  fetch("./php/pg_post_comment.php", { method: "POST", body: postData }).then(
    () => location.reload()
  );
}

async function showComments(ev, id) {
  const comments = await fetch(`./php/pg_get_comment.php?id=${id}`).then(
    (data) => data.json()
  );
  console.log("./php/pg_get_comment.php?id=${id}");
  console.log(comments);
  const node = ev.target.parentNode;
  for (const { comment_id, content, post_id, timestamp } of comments) {
    const ts = new Date(timestamp);
    const comment = `
        <div class="comment" data-comment-id="comment_${id}">
            <header>
                <p class="timestamp">${ts.toLocaleString()}</p>
            </header>
            <p>${content}</p>
        </div>`;
    node.innerHTML += comment;
  }
}
