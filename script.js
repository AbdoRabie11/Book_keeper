
const modal = document.getElementById("modal")
const modalShow = document.getElementById("show-modal")
const modalClose = document.getElementById("close-modal")
const bookmarkForm = document.getElementById("bookmark-form")
const websiteNameEl= document.getElementById("website-name")
const websiteUrlEl= document.getElementById("website-url")
const bookmarksContainer= document.getElementById("bookmarks-container")

let bookmarks = [];

function showModal() {
    modal.classList.add("show-modal")
    websiteNameEl.focus();
}
// modal event

modalShow.addEventListener("click" , showModal);
// 
function closModal() {
    modal.classList.remove("show-modal")
}

modalClose.addEventListener("click" , closModal)

window.addEventListener("click" , (e) => e.target.classList.remove("show-modal"))
// validat form
function validate(nameValue, urlvalue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!nameValue || !urlvalue) {
        // alert("please subimt the input")
    }
    if(urlvalue.match(regex)) {
        // alert("matech")
    }
if(!urlvalue.match(regex)) {
    // alert("plead go to hell")
    return false
}
return true
}
// build book marks dom 

function buildBookmarks() {
// remove all bookmark
bookmarksContainer.textContent = '';
    bookmarks.forEach((bookmark) => {
        const {name , url} = bookmark;
        // item
        const item = document.createElement("div");
        item.classList.add('item')
        // close icon
        const closeIcon = document.createElement('i')
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark')
        closeIcon.setAttribute('onclick',`deleteBookmark('${url}')` );
        
        const linkInfo = document.createElement('div')
        linkInfo.classList.add("name");

        const favicon = document.createElement('img');
        favicon.setAttribute('src', `favicon.png`)

        const link = document.createElement('a')
        link.setAttribute('href', `${url}`)
        link.setAttribute('target' , '_blank');
        link.textContent = name

        linkInfo.append(favicon, link)
        item.append(closeIcon, linkInfo)
        bookmarksContainer.appendChild(item)
    })
}
// fetch bookmarks
function fetchBookmarks() {
    if(localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    }else{
        bookmarks = [
            {
                name: 'jonhe dmoe',
                url: 'https://google.com',
            },
        ];

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
buildBookmarks();
}



// delet book mark
function deleteBookmark(url) {
bookmarks.forEach((bookmark,i) => {
    if (bookmark.url === url) {
        bookmarks.splice(i,1);

    }
})
localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
fetchBookmarks();
}

// envet listiner

function sotreBookmark(e) {
// e.preventDefault();
const nameValue = websiteNameEl.value;
let urlvalue = websiteUrlEl.value;
if(!urlvalue.includes('http://', 'https://')) {
    urlvalue = `https://${urlvalue}`;
}
if(!validate(nameValue, urlvalue)) {
    return false;
}
const bookmark = {
    name: nameValue,
    url: urlvalue,
};
bookmarks.push(bookmark)
localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
fetchBookmarks()
bookmarkForm.reset()
websiteNameEl.focus()

}



bookmarkForm.addEventListener("submit" , sotreBookmark);


// onload
fetchBookmarks()

