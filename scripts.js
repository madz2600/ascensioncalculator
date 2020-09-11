// Icons from https://github.com/Gethe/wow-ui-textures
let icon_url_base = {
  live: "https://raw.githubusercontent.com/Gethe/wow-ui-textures/live/",
  classic: "https://raw.githubusercontent.com/Gethe/wow-ui-textures/classic/"
};
let icon_url_class = {
  druid : "ICONS/ClassIcon_Druid.PNG",
  hunter : "ICONS/ClassIcon_Hunter.PNG",
  mage : "ICONS/ClassIcon_Mage.PNG",
  paladin : "ICONS/ClassIcon_Paladin.PNG",
  priest : "ICONS/ClassIcon_Priest.PNG",
  rogue : "ICONS/ClassIcon_Rogue.PNG",
  shaman : "ICONS/ClassIcon_Shaman.PNG",
  warlock : "ICONS/ClassIcon_Warlock.PNG",
  warrior : "ICONS/ClassIcon_Warrior.PNG"
};

$(window).ready(function()
{
  $.getJSON("data.json", function(data)
  {
    // Debug
    console.log(data);

    // Setup class icons
    $.each(data.classes, function(id, obj)
    {
      let icon = $("<div></div>")
        .attr("data-id", id)
        .attr("data-name", obj.name)
        .addClass("item-class")
        .css("background-image", "url(" + icon_url_base.live + obj.icon + ")")
        .on("click", function()
        {
          $(".item-class").removeClass("toggled");
          $(this).addClass("toggled");
        });
      $(".nav-class").append(icon);
    });

    // Load first druid as default
    get_abilities(data, "druid");
  })
  .fail(function()
  {
    console.log("Couldn't load data");
  });
});

function get_abilities(data, selected)
{
  $.each(data.classes[selected].specs, function(spec, abilities)
  {
    // Init objects
    let parent = $(".col-left");
    let output = $("<div></div>").addClass("spec");
    // Add spec title to spell list
    let title = $("<div></div>").addClass("title").html(spec);
    // Get spells
    let spell_container = $("<div></div>").addClass("spell-container");
    $.each(abilities.spells, function(spell, props)
    {
      let container = $("<div></div>")
        .addClass("spell")
        .css("background-image", "url(" + icon_url_base.live + props.icon + ")");
      let tooltip = $("<div></div>")
        .addClass("tooltip");
      let title = $("<div></div>")
        .addClass("title")
        .html(spell);
      let rank = $("<div></div>")
        .addClass("rank")
        .html("Rank " + props.rank);
      let level_req = $("<div></div>")
        .addClass("level_req")
        .html("Requires level " + props.lvl_req);
      let cost_string = "";
      if (props.resource_type = "mana")
      {
        cost_string = props.resource_cost + " of base " + props.resource_type;
      }
      else
      {
        cost_string = props.resource_cost + " " + props.resource_type;
      }
      let cost = $("<div></div>")
        .addClass("cost")
        .html(cost_string);
      let cooldown_string = "";
      if (props.cooldown > 0)
      {
        if (props.cooldown % 60 != 0)
        {

        }
      }
      let cooldown = $("<div></div>")
        .addClass("cooldown");
      let distance = $("<div></div>")
        .addClass("distance");
      let description = $("<div></div>")
        .addClass("description");
      let costs = $("<div></div>")
        .addClass("costs");

      tooltip.append(title);
      tooltip.append(rank);
      tooltip.append(level_req);
      tooltip.append(cost);
      tooltip.append(cooldown);
      tooltip.append(distance);
      tooltip.append(description);
      tooltip.append(costs);

      container.append(tooltip);
      spell_container.append(container);
      /*

      "icon" : "ICONS/Spell_Nature_AbolishMagic.PNG",
      "lvl_req": 1,
      "resource_type": "mana",
      "resource_cost": "7%",
      "cast_time": 1.5,
      "rank": 1,
      "rank_max": 1,
      "distance": 30,
      "cooldown": 8,
      "description": "Causes ? to ? Nature damage to the target. Deals ?% less damage to players.",
      "upgrade_vals": {
        "1": [23, 25, 10]
      },
      "cost_AE": 2,
      "cost_TE": 0

      <div class="spell">
        <div class="tooltip">
          <div class="title">This is a title</div>
          <div class="rank">Rank 1</div>
          <div class="level-req">Required level 0</div>
          <div class="description">
            This is the description. Upgrade to increase coolness by <span>10%</span>! Requires sunglasses.<br>
            This is the description. Upgrade to increase coolness by <span>10%</span>! Requires sunglasses.
          </div>
          <div class="costs">2 AE 1 TE</div>
        </div>
      </div>
      */
    });
    // Put it together
    output.append(title);
    output.append(spell_container);
    parent.append(output);

    //console.log(spec);
    //console.log(abilities);
  });
}

function coord_to_grid(obj, col, row)
{
  obj.css({
    "grid-column" : col + " / " + col + 1,
    "grid-row" : row + " / " + row + 1
  });
}
