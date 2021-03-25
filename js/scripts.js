'use strict'
//  Прибавление числа в таблице
$("body").on("click", ".number__button", function () {
  let min_val = $(this).parents(".product__number").find(".number__input").attr("min");
  let max_val = $(this).parents(".product__number").find(".number__input").attr("max");
  let cur_val = +$(this).parents(".product__number").find(".number__input").val();
  let inp = $(this).parents(".product__number").find(".number__inputproduct__number");
  if ($(this).hasClass("number__button--dec")) {
    if (min_val) {
      if (!(cur_val - 1 < +min_val)) {
        $(this).parents(".product__number").find(".number__input").val(cur_val - 1);
      }
    }
    else if (!(cur_val - 1 < 0)) {
      $(this).parents(".product__number").find(".number__input").val(cur_val - 1);
    }
  }
  else if ($(this).hasClass("number__button--inc")) {
    if (max_val) {
      if (!(cur_val + 1 > +max_val)) {
        $(this).parents(".product__number").find(".number__input").val(cur_val + 1);
      }
    }
    else {
      $(this).parents(".product__number").find(".number__input").val(cur_val + 1);
    }
  }
});

$("body").on("change", ".number__input", function () {
  let min_val = +$(this).attr("min");
  let max_val = +$(this).attr("max");
  let cur_val = +$(this).val();
  let old_val = $(this).attr("data-val");
  if (min_val && max_val) {
    if (cur_val < min_val) {
      $(this).val(min_val)
    }
    else if (cur_val > max_val) {
      $(this).val(max_val);
    }
  }
  else if (min_val) {
    if (cur_val < min_val) {
      $(this).val(min_val)
    }
  }
  else if (max_val) {
    if (cur_val > max_val) {
      $(this).val(max_val);
    }
  }
});

// Открытие меню ЛК и добавление тени на header
(() => {
  const loginButton = document.querySelector(".menu__item--login");
  const loginMenu = document.querySelector(".user-menu");
  const header = document.querySelector('.header');

  if (document.body.clientWidth > 1366) {
    loginButton.addEventListener("mouseenter", function (evt) {
      evt.preventDefault();
      loginMenu.classList.add("user-menu--active");
      header.classList.add("header--shadow");

    })
    loginButton.addEventListener("mouseleave", function (evt) {
      evt.preventDefault();
      loginMenu.classList.remove("user-menu--active");
      header.classList.remove("header--shadow");

    })
  }


})();

// Открытие выпадашек фильтров
(() => {
  const filterFieldset = document.querySelectorAll(".filter__fieldset");
  const filterRadioInput = document.querySelectorAll(".method-radio__input");
  filterFieldset.forEach((fieldset) => {
    const buttonSelect = fieldset.querySelector(".button--select");
    const filterPopUp = fieldset.querySelectorAll(".filter__pop-up");
    buttonSelect.addEventListener("click", function () {


      filterPopUp.forEach((popUP) => {
        const filterInput = popUP.querySelectorAll("input");
        filterInput.forEach((input) => {
          if (input != null) {
            input.addEventListener("change", function () {
              let checkInput = popUP.querySelectorAll("input:checked");
              let n = checkInput.length
              buttonSelect.innerHTML = `Выбрано: ${n}`
            });
          }
        });
      });

      if (filterRadioInput != null) {
        filterPopUp.forEach((popUp) => {
          if (popUp.hasAttribute("data-method")) {
            filterRadioInput.forEach((radio) => {
              if (radio.checked && radio.dataset.method == popUp.dataset.method) {
                openFieldset(fieldset, buttonSelect, popUp);
              }
            })
          } else {
            openFieldset(fieldset, buttonSelect, popUp);
          }
        })
      } else {
        buttonSelect.addEventListener("click", openFieldset(fieldset, buttonSelect, filterPopUp))
      }
    });
  });


  function openFieldset(fieldset, button, popUp) {
    popUp.classList.toggle("filter__pop-up--show");
    button.classList.toggle("button--select--active");
    document.addEventListener("click", function (evt) {
      const target = evt.target;
      if (!fieldset.contains(target)) {
        popUp.classList.remove("filter__pop-up--show");
        button.classList.remove("button--select--active");
      }
    });
  }
})();

//  Открытие фильров по нажатию кнопки "фильтры" в мобильной версии
(() => {
  const filterButtonOpen = document.querySelectorAll(".filter__button-open");
  const filterButtonClose = document.querySelector(".filter__button-close");
  const filter = document.querySelectorAll(".filter");
  const filterPopUp = document.querySelectorAll(".filter__pop-up");
  filter.forEach((filterItem) => {
    filterButtonOpen.forEach((button) => {
      button.addEventListener("click", function (evt) {
        evt.preventDefault();
        if (button.dataset.filter == filterItem.dataset.filter) {
          filterItem.classList.add("filter--show");
          filterButtonClose.classList.add("filter__button-close--show")
        }
      });
      filterButtonClose.addEventListener("click", function (evt) {
        evt.preventDefault();
        filterItem.classList.remove("filter--show");
        filterButtonClose.classList.remove("filter__button-close--show");
        filterPopUp.forEach((item) => {
          item.classList.remove("filter__pop-up--show");
        });
      })
    });
  })

})();

(() => {
  const radioShow = document.querySelectorAll(".js-radio-show");
  const windowDisplay = document.querySelectorAll(".js-display-window");
  radioShow.forEach((radio) => {
    radio.addEventListener("change", function (evt) {
      windowDisplay.forEach((window) => {
        if (window.dataset.method == radio.dataset.method) {
          window.classList.remove("visually-hidden");
        } else {
          window.classList.add("visually-hidden");
        }
      });
    });
  });

})();
// burger
(() => {
  const burgerMenu = document.querySelector(".burger")
  const mobileMenu = document.querySelector(".site__catalog")

  burgerMenu.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (!burgerMenu.classList.contains("burger--open")) {
      mobileMenu.classList.add("site__catalog--active");
      burgerMenu.classList.add("burger--open");
    } else {
      mobileMenu.classList.remove("site__catalog--active");
      burgerMenu.classList.remove("burger--open");
    }
  })
})();

// Модальное окно выхода из личного кабинета
(() => {
  const modal = document.querySelectorAll(".js-modal");
  const modalOpen = document.querySelectorAll(".js-modal-open");
  const burgerMenu = document.querySelector(".burger")

  function footerHidden() {
    if (document.body.clientWidth < 1366) {
      const footer = document.querySelector("footer");
      footer.classList.remove("visually-hidden");
    }
  }

  modal.forEach((item) => {
    modalOpen.forEach((button) => {
      if (button.dataset.modal == item.dataset.modal) {
        button.addEventListener("click", function (evt) {
          evt.preventDefault();
          item.classList.remove("visually-hidden")
          burgerMenu.classList.add("burger--open");
          if (document.body.clientWidth < 1366) {
            const footer = document.querySelector("footer");
            footer.classList.add("visually-hidden");
          }
        })
      }
    });

    // закрытие через бургер
    burgerMenu.addEventListener("click", function (evt) {
      evt.preventDefault();
      item.classList.add("visually-hidden");
      footerHidden();
    });

    const modalClose = item.querySelectorAll(".js-modal-close");
    const modalShadow = item.querySelector(".modal-shadow");

    modalClose.forEach((closeButton) => {
      closeButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        item.classList.add("visually-hidden");
        footerHidden();
      })
    })
    modalShadow.addEventListener("click", function (evt) {
      evt.preventDefault();
      item.classList.add("visually-hidden");
      footerHidden();
    })
    document.addEventListener('keydown', function (event) {
      if (event.code == 'Escape') {
        event.preventDefault();
        item.classList.add("visually-hidden");
        footerHidden();
      }
    });
  })
})();


//  Боковая кнопка фильnра в середние экрана при скроле страницы
(() => {
  window.onscroll = function () {
    const scroll = document.documentElement.scrollTop || document.body.scrollTop;
    const header = document.querySelector('.header');
    if (scroll > 0) {
      header.classList.add('header--active');
    } else {
      header.classList.remove('header--active');
    }
    const mobileFilterButton = document.querySelector(".filter__button-mobile");
    const tableHeader = document.querySelector(".js-table__header");
    if (
      mobileFilterButton !== null &&
      tableHeader !== null
    ) {
      let bodyRect = document.body.getBoundingClientRect(),
        mobileFilterButtonRect = mobileFilterButton.getBoundingClientRect(),
        tableHeaderRect = tableHeader.getBoundingClientRect(),
        offsetMobileFilterButton = mobileFilterButtonRect.top - bodyRect.top,
        offsetTableHeader = tableHeaderRect.top - bodyRect.top,
        offsetTableFooter = tableHeaderRect.bottom - bodyRect.top;

      if (scroll >= offsetTableHeader &&
        offsetMobileFilterButton <= offsetTableFooter &&
        offsetMobileFilterButton != offsetTableFooter &&
        offsetMobileFilterButton < offsetTableFooter &&
        !mobileFilterButton.classList.contains("filter__button-mobile--bottom")) {

        mobileFilterButton.classList.add("filter__button-mobile--acitve");

      } else if (Math.round(offsetMobileFilterButton) >= Math.round(offsetTableFooter)) {
        mobileFilterButton.classList.add("filter__button-mobile--bottom");
        mobileFilterButton.classList.remove("filter__button-mobile--acitve");

      }
      if (window.pageYOffset + document.documentElement.clientHeight <= offsetTableFooter) {
        mobileFilterButton.classList.remove("filter__button-mobile--bottom");
      }
      if (scroll <= offsetTableHeader) {
        mobileFilterButton.classList.remove("filter__button-mobile--acitve");
      }
    }
  }
})();

(() => {
  const filterAsideOpen = document.querySelector(".js-filter-open");
  const filter = document.querySelector(".aside-filter");
  const burgerMenu = document.querySelector(".burger")

  if (
    filterAsideOpen != null &&
    filter != null &&
    burgerMenu != null
  ) {

    filterAsideOpen.addEventListener("click", function (evt) {
      evt.preventDefault();
      filter.classList.add("aside-filter--acitve")
      burgerMenu.classList.add("burger--open");
      filterAsideOpen.style.display = "none"
    });
    burgerMenu.addEventListener("click", function (evt) {
      evt.preventDefault();
      filter.classList.remove("aside-filter--acitve")
      filterAsideOpen.style.display = "flex"
    })
  }

})();







// Открытие категорий по клику на кнопку
(() => {
  const categoryBlock = document.querySelectorAll(".category__sub-wrapper");
  categoryBlock.forEach((block) => {
    const categoryButton = block.querySelector(".button--category");
    const categoryList = block.querySelector(".category__list")
    if (
      categoryButton != null &&
      categoryList != null
    ) {

      categoryButton.addEventListener("click", function (evt) {
        categoryList.classList.toggle("category__list--show");
      });
      document.addEventListener("click", function (evt) {
        const target = evt.target;
        if (!block.contains(target)) {
          categoryList.classList.remove("category__list--show");
        }
      });
    }
  })
})();


// Открытие и закрытие таблицы в Каталоги по нажатию категории
(() => {
  const productSection = document.querySelectorAll(".product");
  productSection.forEach((section) => {
    const productTitleBtn = section.querySelector(".product__title")
    const product = section.querySelectorAll(".table__product")

    if (
      productTitleBtn !== null &&
      product !== null
    ) {
      productTitleBtn.addEventListener("click", function (evt) {
        evt.preventDefault()
        productTitleBtn.classList.toggle("product__title--active")
        product.forEach((item) => {
          item.classList.toggle("table__product--hidden");
        });
      });
    }
  });
})();

// переключение в card
(() => {
  const specDescr = document.querySelectorAll(".js-specification__descrition");
  const specButton = document.querySelectorAll(".js-specification__button");
  specButton.forEach((button, n, allButton) => {
    button.addEventListener("click", function (evt) {
      evt.preventDefault();
      /*  смотрим при клики на все кнопки
       и добавляем класс не активной кнопки
      и убираем класс активной конпки */
      for (let key of allButton) {
        key.classList.remove("button--ocean")
        key.classList.add("button--grey");
      }
      /* Добавляем класс активной кнопки
       и убираем класс не активной*/
      button.classList.add("button--ocean");
      button.classList.remove("button--grey");
      /* Смотрим на список под товаром и скрываем его, если его
      dat-set не соответсвует нажатой кнопки*/
      specDescr.forEach((item) => {
        if (item.dataset.set == button.dataset.set) {
          if (document.body.clientWidth > 1366) {
            item.classList.remove("visually-hidden");
          } else {
            item.classList.toggle("visually-hidden");
            if (item.classList.contains("visually-hidden")) {
              button.classList.remove("button--ocean");
              button.classList.add("button--grey");
            }
          }

        } else {
          item.classList.add("visually-hidden");
        }
      });
    });
  });
})();

(() => {
  let Circle = function (sel) {
    let circles = document.querySelectorAll(sel);
    [].forEach.call(circles, function (el) {
      var valEl = parseFloat(el.innerHTML);
      valEl = valEl * 408 / 100;
      el.innerHTML = '<svg width="85" height="85"><circle transform="rotate(-90)" r="35" cx="-42" cy="41" /><circle transform="rotate(-90)" style="stroke-dasharray:' + valEl + 'px 408px;" r="35" cx="-42" cy="41" /></svg>';

    });
  };
  Circle('.circle');
})();


$('textarea').each(function () {
  this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
}).on('input', function () {
  this.style.height = '46px';
  this.style.height = (this.scrollHeight) + 'px';
});



(() => {
  const currentOrdersTable = document.querySelectorAll('.current-orders__table');
  currentOrdersTable.forEach((table) => {
    const currentOrdersButton = table.querySelector('.js-current-orders__show-button');
    const currentOrdersItem = table.querySelector('.product-swiper');
    const currentOrdersButtonWrapper = table.querySelector('.currnet-orders__button-wrapper')
    const currentsOrdersHeader = table.querySelector('.current-orders__head');
    if (currentOrdersButton !== null) {
      currentOrdersButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        currentOrdersButton.classList.toggle('current-orders__show-button--hidden');
        currentOrdersItem.classList.toggle('visually-hidden');
        currentOrdersButtonWrapper.classList.toggle('visually-hidden');
        currentsOrdersHeader.classList.toggle('visually-hidden');
      });
    }

  });
})();

(() => {
  const accountWindow = document.querySelector(".account-nav");
  const accountButtonOpen = document.querySelector(".profile__menu");
  const accountButtonOpenMenu = document.querySelector(".menu__link--login");
  const accountButtonClose = document.querySelector(".account-nav__close-button");


  if (accountButtonOpen !== null && accountWindow !== null) {
    accountButtonOpen.addEventListener("click", function (evt) {
      evt.preventDefault();
      accountWindow.classList.add("account-nav--active");
      accountButtonClose.classList.add("account-nav__close-button--show");
    });
  }
  if (accountButtonClose !== null && accountWindow !== null) {
    accountButtonClose.addEventListener("click", function (evt) {
      evt.preventDefault();
      accountWindow.classList.remove("account-nav--active");
      accountButtonClose.classList.remove("account-nav__close-button--show");
    });
  }
  if (accountWindow !== null && accountButtonOpenMenu !== null) {
    accountButtonOpenMenu.addEventListener("click", function (evt) {
      evt.preventDefault();
      accountWindow.classList.add("account-nav--active");
      accountButtonClose.classList.add("account-nav__close-button--show");
    });
  }


})();


(() => {
  const accountOptionsItem = document.querySelectorAll(".account-delivery__item")
  accountOptionsItem.forEach((item) => {
    const accountOptions = item.querySelector(".account-delivery__options");
    const accountOptionsList = item.querySelector(".account-data__wrapper");
    item.addEventListener("click", () => {
      accountOptions.classList.toggle("account-delivery__options--active");
      accountOptionsList.classList.toggle("visually-hidden");
    });
  });
})();

(() => {
  const clientItem = document.querySelectorAll(".js-client-item");
  clientItem.forEach((item) => {
    const clientLink = item.querySelectorAll(".js-client-link");
    const clientPopUp = item.querySelectorAll(".js-client-window");
    const client = item.querySelector(".js-client");
    const clientDescription = item.querySelector(".js-client-description");
    const clientMenuBtn = item.querySelector(".js-client-menu-btn");
    const burgerMenu = document.querySelector(".burger")


    if (document.body.clientWidth < 1367) {

      clientMenuBtn.addEventListener("click", function (evt) {
        evt.preventDefault();

        if (clientLink.length <= 2) {
          clientDescription.classList.add("client__description--active");
          clientLink[0].classList.add("client__link--active");
          clientPopUp[0].classList.add("js-client-window--active");
          clientPopUp[0].classList.remove("visually-hidden");
        }
        item.classList.add("client__item--active")
        burgerMenu.classList.add("burger--open");
      });
      burgerMenu.addEventListener("click", function (evt) {
        evt.preventDefault();

        item.classList.remove("client__item--active")
        clientPopUp.forEach((popUP) => {
          popUP.classList.add("visually-hidden");
        })
        if (document.body.clientWidth < 1366) {
          clientLink.forEach((link) => {
            link.classList.remove("client__link--active");
            link.classList.remove("visually-hidden");
          });
        }
      });
    };

    clientLink.forEach((link) => {
      link.addEventListener("click", function (evt) {
        evt.preventDefault();
        clientPopUp.forEach((popUP) => {
          if (link.dataset.client == popUP.dataset.client) {
            if (!popUP.classList.contains("js-client-window--active")) {
              clientPopUp.forEach((popUP) => {
                popUP.classList.add("visually-hidden");
                popUP.classList.remove("js-client-window--active");
              })
              if (document.body.clientWidth < 1366) {
                clientLink.forEach((link) => {
                  link.classList.remove("client__link--active")
                })
              }

              popUP.classList.remove("visually-hidden");
              popUP.classList.add("js-client-window--active");
              client.classList.add("client__wrapper--active");

              if (document.body.clientWidth < 1366) {
                link.classList.add("client__link--active")
                clientLink.forEach((linkNotActive) => {
                  if (!linkNotActive.classList.contains("client__link--active")) {
                    linkNotActive.classList.add("visually-hidden");
                  }
                })
              }

            } else {
              popUP.classList.add("visually-hidden");
              popUP.classList.remove("js-client-window--active");
              client.classList.remove("client__wrapper--active");
              if (document.body.clientWidth < 1366) {
                link.classList.remove("client__link--active")
                clientLink.forEach((link) => {
                  link.classList.remove("visually-hidden");
                })
              }
            }
          }
        })
      });
    });
  });
})();

(() => {
  const modalStatus = document.querySelectorAll(".js-modal-table-status")

  modalStatus.forEach((item) => {
    const modalBtn = item.querySelector(".js-modal-table-status-button");
    const modalFilter = item.querySelector(".js-modal-table-status-filter");

    modalBtn.addEventListener("click", function (evt) {
      evt.preventDefault();
      modalBtn.classList.toggle("modal-table__status-button--active")
      modalFilter.classList.toggle("visually-hidden");
    })
  })
})();


(() => {
  const modalCart = document.querySelector(".modal-cart");

  if (modalCart != null) {
    const modalCartOpen = document.querySelectorAll(".product__button--cart");
    const modalClose = modalCart.querySelector(".js-modal-cart__close");
    const modalShadow = modalCart.querySelector(".modal-shadow");
    if (document.body.clientWidth < 1366) {

      modalCartOpen.forEach((button) => {
        button.addEventListener("click", function (evt) {
          evt.preventDefault();
          modalCart.classList.remove("visually-hidden");
        })
      })
      modalShadow.addEventListener("click", function (evt) {
        evt.preventDefault();
        modalCart.classList.add("visually-hidden");
      })

      document.addEventListener('keydown', function (evt) {
        if (evt.code == 'Escape') {
          evt.preventDefault();
          modalCart.classList.add("visually-hidden");
        }
      })
    }
  }
})();




(() => {
  const addProduct = document.querySelectorAll(".js-add-product");

  addProduct.forEach((item) => {
    const addProductBtn = item.querySelector(".js-add-product__btn");
    const addProductWrapper = item.querySelector(".js-add-product__wrapper");

    addProductBtn.addEventListener("click", function (evt) {
      evt.preventDefault();
      addProductWrapper.classList.toggle("visually-hidden");
      if (addProductBtn.innerHTML == "Добавить товар +") {
        addProductBtn.innerHTML = "Cкрыть добавление товара"
      } else {
        addProductBtn.innerHTML = "Добавить товар +"
      }
    });
  });
})();

(() => {
  const managerDataButton = document.querySelector(".js-manager-data__button");
  const contactInformation = document.querySelector(".js-contact-information");
  const accountData = document.querySelector(".js-general-account-data");
  const contactInformationCancel = document.querySelector(".js-contact-information-cancel-btn");

  if (
    managerDataButton != null &&
    contactInformationCancel != null
  ) {
    managerDataButton.addEventListener("click", function (evt) {
      evt.preventDefault();
      contactInformation.classList.add("contact-information--active")
      accountData.classList.add("visually-hidden");
    });

    contactInformationCancel.addEventListener("click", function (evt) {
      evt.preventDefault();
      contactInformation.classList.remove("contact-information--active")
      accountData.classList.remove("visually-hidden");
    });
  }
})();

(() => {
  if (document.body.clientWidth > 1366) {
    const asideFilter = document.querySelector(".aside-filter");
    if (asideFilter != null) {
      const asideFilterBtn = asideFilter.querySelector(".js-aside-filter__button");
      const asideFilterList = asideFilter.querySelector(".js-aside__filter__list");
      const asideMoreBtn = asideFilter.querySelector(".js-aside-filter__more");
      asideFilterBtn.addEventListener("click", function (evt) {
        evt.preventDefault();
        asideFilterList.classList.toggle("visually-hidden");
        asideMoreBtn.classList.toggle("visually-hidden");
        asideFilterBtn.classList.toggle("aside-filter__button--active")

      });
    }

  }
})();

(() => {
  const moreWrapper = document.querySelectorAll(".js-more-wrapper");
  moreWrapper.forEach((wrapper) => {
    const moreItem = wrapper.querySelectorAll(".js-more-item");
    const moreButton = wrapper.querySelector(".js-more-button");
    let buttonText = moreButton.innerHTML;
    moreItem.forEach((item) => {

      moreButton.addEventListener("click", function (evt) {

        if (item.classList.contains("visually-hidden")) {
          evt.preventDefault();
          item.classList.remove("visually-hidden");
          item.classList.add("js-more-item-hidden");
          this.innerHTML = "Скрыть";
        } else if (!item.classList.contains("visually-hidden")) {
          if (item.classList.contains("js-more-item-hidden")) {
            evt.preventDefault();
            item.classList.add("visually-hidden");
            item.classList.remove("js-more-item-hidden");
            this.innerHTML = buttonText;
          }
        }
      })

    });

  });


})();

(() => {
  const catalogPopUp = document.querySelector(".catalog__pop-up");

  const catalogItem = catalogPopUp.querySelectorAll(".catalog__item");
  catalogItem.forEach((item) => {
    const catalogButton = item.querySelector(".catalog__button");
    const catalogWrapper = item.querySelector(".catalog-item__wrapper")
    const catalogList = item.querySelector(".catalog__list");
    if (catalogButton != null) {
      catalogButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        catalogList.classList.toggle("catalog__list--active")
        catalogWrapper.classList.toggle("catalog-item__wrapper--active")
      })
    }

  })
})();

$(function () {
  $('.scroll-pane').jScrollPane(
    {
      autoReinitialise: true
    }
  );
});

(() => {
  const filterWrapper = document.querySelector(".js-filter");
  if (filterWrapper != null) {
  const filterInput = filterWrapper.querySelectorAll("input");


  const filterDelete = document.querySelectorAll(".js-filter-delete");
  const filterList = document.querySelectorAll(".js-filter-list");

  filterDelete.forEach((button) => {
    button.addEventListener("click", function (evt) {
      evt.preventDefault();

      filterInput.forEach((input) => {

        filterList.forEach((list) => {

          const filterItem = list.querySelectorAll(".js-filter-item");
          filterItem.forEach((item) => {

            if (item.dataset.input == input.dataset.input) {
              item.remove();
              input.checked = false;
            }
          });
        });
      });
    });

  });

  function toggleInputDeleteItem() {
    filterList.forEach((list) => {
      const filterItem = list.querySelectorAll(".js-filter-item");
      filterItem.forEach((item) => {
        filterInput.forEach((input) => {
          const deleteButton = item.querySelector("button");
          deleteButton.addEventListener("click", function () {
            if (input.dataset.input == this.dataset.input) {
              item.remove();
              input.checked = false;
            }
          });
        });
      });
    });
  }
  toggleInputDeleteItem();



  filterInput.forEach((input) => {
    filterList.forEach((list) => {
      input.addEventListener("change", function () {
        if (this.checked) {
          let li = document.createElement("li");
          li.classList.add("manager-filter__item", "js-filter-item")
          li.setAttribute("data-input", this.dataset.input);
          li.innerHTML = `
            <p class="manager-filter__name">${this.dataset.input}</p>
            <button class="manager-filter__delete" data-input="${this.dataset.input}"><span class="visually-hidden">Удалить</span></button>
          `
          list.append(li);
          toggleInputDeleteItem();
        } else {
          const filterItem = list.querySelectorAll(".js-filter-item");
          filterItem.forEach((item) => {
            if (item.dataset.input == this.dataset.input) {
              item.remove();
            }
          });
        }
      });
    });
  });
}
})();
