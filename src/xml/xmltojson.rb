require 'rubygems'
require 'xmlsimple'
require 'uuidtools'
require 'yaml'

# puts UUIDTools::UUID.random_create

# :attributes [["name", default]]
# :children [["name", number or *]]
# :text true
# everything gets an id
# everything gets a class
$elements = {
  
  #####
  # Provide no useful attributes but do collect data
  # manually merge to a single array
  #####
  # character.infos
#  "infos" => {
#    :attributes => [],
#    :children => [["info", "*"]]
#  },
  # character.custom_modifiers
#  "custom_modifiers" => {
#    :attributes => [],
#    :children => [["effect", "*"]]
#  },
  # data.modifiers
#  "modifiers" => {
#    :attributes => [],
#    :children => [["modifier", "*"]]
#  },
  # data.tables
#  "tables" => {
#    :attributes => [],
#    :children => [["table", "*"]]
#  },
  # character.measurements
#  "measurements" => {
#    :attributes => [],
#    :children => [["measurement", "*"]]
#  },
  # data.archetypes
#  "archetypes" => {
#    :attributes => [],
#    :children => [["meta_qualities", "*"]]
#  },


  #####
  # 
  #####
  "data" => {
    :attributes => [["version", 1], ["cost_willpower_base", 3], ["cost_willpower", 1]],
    :children => [["pools", 1], ["meta_qualities", 1], ["archetypes", "meta_qualities"], ["modifiers", "modifier"], ["character", 1], ["tables", "table"]]
  },
  "character" => {
    :attributes => [["version", 1], ["name", " "], ["points", 0]],
    :children => [["infos", "info"], ["willpower", 1], ["meta_qualities", 1], ["pools", 1], ["custom_modifiers", "effect"], ["measurements", "measurement"]]
  },
  "info" => {
    :attributes => [["name", " "]],
    :children => [],
    :text => true
  },
  "willpower" => {
    :attributes => [["min_base", 0], ["base", 0], ["current", 0], ["points", 0]],
    :children => [["motivation", "*"]]
  },
  "motivation" => {
    :attributes => [["type", "SOMETYPE"], ["value", 0], ["name", " "]],
    :children => []
  },
  "effect" => {
    :attributes => [["type", "SOMETYPE"], ["name", "SOMENAME"], ["cost", 0], ["note", " "], ["is_note_required", false], ["link", " "], ["is_link_required", false], ["is_add_measurement", false], ["die_cost", 0], ["source", " "]],
    :children => [["modifier", "*"]]
  },
  "pools" => {
    :attributes => [["points_stats", 0], ["points_skills", 0], ["points_powers", 0]],
    :children => [["pool", "*"]]
  },
  "pool" => {
    :attributes => [["type", "SOMETYPE"], ["name", " "], ["die_cost", 0], ["normal", 0], ["hard", 0], ["wiggle", 0], ["points", 0], ["source", " "]],
    :children => [["effect", "*"]]
  },
  "modifier" => {
    :attributes => [["type", "SOMETYPE"], ["name", " "], ["cost", 0], ["note", " "], ["is_note_required", false], ["has_ranks", true], ["ranks", 1], ["link", " "], ["is_link_required", false], ["mod", 0], ["is_chosen", true], ["source", " "]],
    :children => []
  },
  "meta_qualities" => {
    :attributes => [["type", "SOMETYPE"], ["name", " "], ["points", 0], ["source", " "]],
    :children => [["meta_quality", "*"]]
  },
  "meta_quality" => {
    :attributes => [["type", "SOMETYPE"], ["name", " "], ["cost", 0], ["is_custom", false], ["note", " "], ["is_note_required", false], ["is_chosen", true], ["source", " "]],
    :children => []
  },
  "table" => {
    :attributes => [["type", "SOMETYPE"], ["name", " "], ["units", " "], ["link", " "], ["boost", 0], ["beyond", 0]],
    :children => [["measurement", "*"]]
  },
  "measurement" => {
    :attributes => [["type", "SOMETYPE"], ["pool", 0], ["text_cols", " "], ["text", " "], ["units", " "], ["value", 0]],
    :children => []
  },
}

def integer?(i)
  i =~ /^[-+]?\d*$/
end

def float?(i)
  i =~ /^[-+]?\d*\.?\d*$/
end

def jsonStr(value)
  if (value.kind_of? String)
    return "null" if value == nil
    return "true" if value == "true"
    return "false" if value == "false"
    return value.to_i if integer?(value)
    return value.to_f if float?(value)
    return "\"#{value}\""
  end
  return value
end

def getAttr(at, data)
  name = at[0]
  default = at[1]
  value = data[name] == nil ? default : data[name]
  ", #{jsonStr(name)}: #{jsonStr(value)}"
end

def getArray(name, ary)
  return "[]" if ary == nil
  value = ""
  ary.each {|elem|
    if value.length == 0
      value += "["
    else
      value += ", "
    end
      value += writeElement(name, elem)
  }
  value += "]"
end

def getChildren(cur, data)
  name = cur[0]
  length = cur[1]
  value = ""
  if length == 1
    value = writeElement(name, data[name][0])
  elsif length == "*"
    value = getArray(name, data[name])
    name += "s"
  else
    tmp = data[name]
    if tmp.kind_of? Array and tmp.length == 1
      value = getArray(length, tmp[0][length])
    else
      puts "*****"
      puts tmp.to_yaml
      puts "*****"
      puts data.to_yaml
      puts "*****"
    end
  end

  ", #{jsonStr(name)}: #{value}"
end

def writeElement(name, data)
  return "{}" if data == nil
  
  cfg = $elements[name]
  data["id"] = UUIDTools::UUID.random_create.to_s
  str = "{ #{jsonStr("class")}: #{jsonStr(name)}, #{jsonStr("id")}: #{jsonStr(data["id"])}"
  
  cfg[:attributes].each {|cur|
    str += getAttr(cur, data)
  }

  cfg[:children].each {|cur|
    str += getChildren(cur, data)
  }
  
  str += ", #{jsonStr("text")}: #{jsonStr(" ")}" if cfg[:text] == true
  
  str += " }"
  str
end

doc = XmlSimple.xml_in('WildTalentsCharacterCreatorData.xml')
#puts doc.to_yaml

out = writeElement("data", doc)
puts out