
// export function getVideoId(url) {
//     const [p1, p2] = url.split('?v=');
//     const [videoId, other] = p2.split('&');

//     return videoId;
// }


export function extractVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}