<?php
// ContentEngine start!
require_once __DIR__ . '/inc/ContentEngine.php';
$cms = new ContentEngine();
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php if ($cms->is_single()) { ?>
      <title><?php echo $cms->get_title() . ' | '; ?>SAMPLE BLOG | QWEL in Action</title>
    <?php } else { ?>
      <title>SAMPLE BLOG | QWEL in Action</title>
    <?php } ?>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=Noto+Sans:wght@100..900&family=Noto+Serif:wght@100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../style.css">
  </head>
  <body>
    <header>
      <h1 class="text-center my-large">SAMPLE BLOG</h1>
    </header>
    <main id="main" class="main">
      <div class="main__container">
        <?php echo $cms->get_breadcrumb(); ?>
        <?php if (!$cms->is_single()) { ?>
          <ul class="postList postList--list">
            <?php foreach ($cms->get_posts() as $post) { ?>
              <li class="postList__item postItem">
                <figure class="postItem__image">
                  <a href="./?slug=<?php echo $post['slug']; ?>">
                    <img loading="razy" src=".<?php echo $post['img'] ?>">
                  </a>
                </figure>
                <div class="postItem__content">
                  <div class="postItem__info">
                    <div class=postItem__date><?php echo date('Y.m.d',strtotime($post['date'])); ?></div>
                  </div>
                  <h3 class="postItem__heading">
                    <a href="./?slug=<?php echo $post['slug']; ?>">
                      <?php echo $post['title']; ?>
                    </a>
                  </h3>
                  <p class="postItem__excerpt">
                    <?php echo $post['summary']; ?>
                    <a class="postItem__more" href="./?slug=<?php echo $post['slug']; ?>">view more &gt;</a>
                  </p>
                </div>
              </li>
            <?php } ?>
          </ul>
          <?php echo $cms->pagination(); ?>
          <?php } else { ?>
            <div class="main__row">
              <article class="main__article">
                <div><?php echo $cms->get_date(); ?></div>
                <?php echo $cms->get_content(); ?>
              </article>
              <aside class="main__aside">
                <h2>最新記事</h2>
                <ul class="postIndex">
                  <?php foreach ($cms->get_posts(1, 4) as $post) { ?>
                    <li class="postIndex__item">
                      <a href="./?slug=<?php echo $post['slug']; ?>">
                        <img loading="razy" class="postIndex__image" src=".<?php echo $post['img']; ?>">
                        <span class="postIndex__date"><?php echo date('Y.m.d',strtotime($post['date'])); ?></span>
                        <span class="postIndex__title"><?php echo $post['title']; ?></span>
                      </a>
                    </li>
                  <?php } ?>
                </ul>
              </aside>
            </div>
          <?php } ?>
        </div>
      </div>
    </main>
    <footer id="footer" class="footer">
      <div class="footer__inner">
        <a class="footer__item footer__item--github" href="https://github.com/qweldesign" target="_blank" rel="noopener">
          <svg class="icon icon--si icon--github icon--md" width="36" height="36" aria-hidden="true">
            <use href="./icons.svg#si-github"></use>
          </svg>
          <span>GitHub</span>
        </a>
        <a class="footer__item footer__item--contact" href="https://tools.qwel.design/contact-form/" target="_blank" rel="noopener">
          <svg class="icon icon--si icon--mail icon--md" width="36" height="36" aria-hidden="true">
            <use href="./icons.svg#si-mail"></use>
          </svg>
          <span>Contact Me</span>
        </a>
        <small class="footer__copyright"></small>
      </div>
    </footer>
    <script src="./init.js" type="module"></script>
  </body>
</html>
