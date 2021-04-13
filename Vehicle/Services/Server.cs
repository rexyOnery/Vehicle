using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicle.Models;

namespace Vehicle.Services
{
    public class Server
    {
        internal static async Task<T> FindById<T>(int id) where T : class
        {
            using (var _context = new VITS_DBContext())
            {
                return await _context.Set<T>().FindAsync(id);
            }
        }

        internal static async Task<List<T>> GetUserData<T>() where T : class
        {
            using (var _context = new VITS_DBContext())
            {
                return await _context.Set<T>().ToListAsync();
            }
        }

        internal static async Task<List<Vitsuser>> AddUsers<T>(Vitsuser model) where T : class
        {
            using (var _context = new VITS_DBContext())
            {

                _context.Vitsusers.Add(model);
                await _context.SaveChangesAsync();


                return await _context.Vitsusers 
                    .Where(c => c.AgentId.Equals(model.AgentId))
                    .ToListAsync();
            }
        }

        internal static async Task<List<Vitsitem>> PostItems<T>(Vitsitem model) where T : class
        {
            using (var _context = new VITS_DBContext())
            {
                RandomGenerator generator = new RandomGenerator();
                int _tag = generator.RandomNumber(1000, 9999);

                model.TagNumber = _tag.ToString();
                _context.Vitsitems.Add(model);
                _context.SaveChanges();


                return await _context.Vitsitems
                    .Where(c => c.VitsuserId.Equals(model.VitsuserId))
                    .ToListAsync();
            }
        }

        internal static List<UserItems> GetAllPendingAsync(int id)
        {
            using (var _context = new VITS_DBContext())
            {

                var result = _context.Vitsusers.Select(c => new
                                             {
                                                 c.Id,
                                                 c.AgentId,
                                                 c.FirstName,
                                                 c.LastName,
                                                 c.Phone,
                                                 c.State,
                                                 c.City,
                                                 c.Pix 
                                             })
                    .Where(c => c.AgentId.Equals(id)).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    if(!_context.Vitsitems.Any(c=>c.VitsuserId.Equals(i.Id)))
                    {
                        UserItems userItems1 = new UserItems
                        {
                            Id = i.Id,
                            FirstName = i.FirstName,
                            LastName = i.LastName,
                            Phone = i.Phone,
                            Pix = i.Pix, 
                            State = i.State,
                            City = i.City, 
                            AgentId = (int)i.AgentId
                        };
                        userItems.Add(userItems1);
                    }
                    

                }
                return userItems;
            }
        }

        internal static List<UserItems> GetPendingAsync(int id)
        {
            using (var _context = new VITS_DBContext())
            {

                var result = _context.Vitsusers.Select(c => new
                {
                    c.Id,
                    c.AgentId,
                    c.FirstName,
                    c.LastName,
                    c.Phone,
                    c.State,
                    c.City,
                    c.Pix
                })
                    .ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    if (!_context.Vitsitems.Any(c => c.VitsuserId.Equals(i.Id)))
                    {
                        UserItems userItems1 = new UserItems
                        {
                            Id = i.Id,
                            FirstName = i.FirstName,
                            LastName = i.LastName,
                            Phone = i.Phone,
                            Pix = i.Pix,
                            State = i.State,
                            City = i.City,
                            AgentId = (int)i.AgentId
                        };
                        userItems.Add(userItems1);
                    }


                }
                return userItems;
            }
        }

        internal static async Task<List<UserItems>> SearchAsync<T>(string search)
        {
            using (var _context = new VITS_DBContext())
            {

                var result = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 id = user.Id,
                                                 firstname = user.FirstName,
                                                 lastname = user.LastName,
                                                 phone = user.Phone,
                                                 state = user.State,
                                                 city = user.City,
                                                 pix = user.Pix,
                                                 item = items.ItemType,
                                                 tag = items.TagNumber,
                                                 paid = items.Paid,
                                                 itemid = items.Id,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             })
                    .Where(c => c.tag.Equals(search)).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Pix = i.pix,
                        ItemType = i.item,
                        TagNumber = i.tag,
                        Paid = (bool)i.paid,
                        Expired = i.expired,
                        State = i.state,
                        City = i.city,
                        ItemId = i.itemid
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        internal static List<UserItems> GetAllAgentUsersAsync(int id)  
        {
            using (var _context = new VITS_DBContext())
            {

                var result = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 id = user.Id,
                                                 agentid = user.AgentId,
                                                 firstname = user.FirstName,
                                                 lastname = user.LastName,
                                                 phone = user.Phone,
                                                 state = user.State,
                                                 city = user.City,
                                                 pix = user.Pix,
                                                 item = items.ItemType,
                                                 tag = items.TagNumber,
                                                 paid = items.Paid,
                                                 itemid = items.Id,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             })
                    .Where(c => c.agentid.Equals(id)).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Pix = i.pix,
                        ItemType = i.item,
                        TagNumber = i.tag,
                        Paid = (bool)i.paid,
                        Expired = i.expired,
                        State = i.state,
                        City = i.city,
                        ItemId = i.itemid,
                        AgentId = (int)i.agentid
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        internal static List<UserItems> GetAllAgentUsersAsync()
        {
            using (var _context = new VITS_DBContext())
            {

                var result = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 id = user.Id,
                                                 agentid = user.AgentId,
                                                 firstname = user.FirstName,
                                                 lastname = user.LastName,
                                                 phone = user.Phone,
                                                 state = user.State,
                                                 city = user.City,
                                                 pix = user.Pix,
                                                 item = items.ItemType,
                                                 tag = items.TagNumber,
                                                 paid = items.Paid,
                                                 itemid = items.Id,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             }).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Pix = i.pix,
                        ItemType = i.item,
                        TagNumber = i.tag,
                        Paid = (bool)i.paid,
                        Expired = i.expired,
                        State = i.state,
                        City = i.city,
                        ItemId = i.itemid,
                        AgentId = (int)i.agentid
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        internal static List<UserItems> GetAllUsersAsync()
        {
            using (var _context = new VITS_DBContext())
            {

                var result = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 id = user.Id,
                                                 agentid = user.AgentId,
                                                 firstname = user.FirstName,
                                                 lastname = user.LastName,
                                                 phone = user.Phone,
                                                 state = user.State,
                                                 city = user.City,
                                                 pix = user.Pix,
                                                 item = items.ItemType,
                                                 tag = items.TagNumber,
                                                 paid = items.Paid,
                                                 itemid = items.Id,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             }).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Pix = i.pix,
                        ItemType = i.item,
                        TagNumber = i.tag,
                        Paid = (bool)i.paid,
                        Expired = i.expired,
                        State = i.state,
                        City = i.city,
                        ItemId = i.itemid,
                        AgentId = (int)i.agentid
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }
        internal static List<UserItems> GetAllForAdminAsync()
        {
            using (var _context = new VITS_DBContext())
            {

                var result = _context.Vitsusers.Join(_context.Agents,
                                             e => e.AgentId,
                                             d => d.Id,
                                             (user, items) => new
                                             {
                                                 id = user.Id,
                                                 agentid = user.AgentId,
                                                 firstname = user.FirstName,
                                                 lastname = user.LastName,
                                                 phone = user.Phone,
                                                 state = user.State,
                                                 city = user.City,
                                                 pix = user.Pix,
                                                 item = items.FirstName +" "+items.LastName, 
                                                 itemid = items.Id,
                                                 //expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             }).ToList();
                    //.Where(c => c.agentid.Equals(id)).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Pix = i.pix,
                        ItemType = i.item, 
                        State = i.state,
                        City = i.city,
                        ItemId = i.itemid,
                        AgentId = (int)i.agentid
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        internal static List<DashItems> GetAdminDashBoardInfoAsync()
        {
            using (var _context = new VITS_DBContext())
            {
                var allCount = _context.Vitsusers.Count();
                var active = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 agent = user.AgentId,
                                                 paid = items.Paid,
                                                 thimonth = Convert.ToDateTime(items.AgentMonth).Month + "/" + Convert.ToDateTime(items.AgentMonth).Year,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             })
                    .Where(c => c.paid.Equals(true));

                var _active = 0;
                foreach (var i in active)
                {
                    var _month = DateTime.Now.Month + "/" + DateTime.Now.Year;
                    if (i.expired.Equals("Not Expired") && i.thimonth.Equals(_month))
                    {
                        _active += 1;
                    }
                }

                var _money = 0.8 * _active * 1000;

                DashItems dashItems = new DashItems
                {
                    Accrued = _money.ToString(),
                    ActiveCustomers = _active.ToString(),
                    Customers = allCount.ToString()
                };
                List<DashItems> _dashItems = new List<DashItems>();
                _dashItems.Add(dashItems);
                return _dashItems.ToList();
            }
        }


        internal static List<DashItems> GetDashBoardInfoAsync(int id)
        {
            using (var _context = new VITS_DBContext())
            {
                var allCount = _context.Vitsusers.Where(c => c.AgentId.Equals(id)).Count();
                var active = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 agent = user.AgentId,
                                                 paid = items.Paid,
                                                 thimonth = Convert.ToDateTime(items.AgentMonth).Month+"/"+ Convert.ToDateTime(items.AgentMonth).Year,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             })
                    .Where(c => c.agent.Equals(id) && c.paid.Equals(true));

                var _active = 0;
                foreach(var i in active)
                {
                    var _month = DateTime.Now.Month + "/" + DateTime.Now.Year;
                    if ( i.expired.Equals("Not Expired") && i.thimonth.Equals(_month))
                    {
                        _active += 1;
                    }
                }

                var _money = 0.2 * _active * 1000;

                DashItems dashItems = new DashItems
                {
                    Accrued = _money.ToString(),
                    ActiveCustomers = _active.ToString(),
                    Customers = allCount.ToString()
                };
                List<DashItems> _dashItems = new List<DashItems>();
                _dashItems.Add(dashItems);
                return _dashItems.ToList();
            }
        }

        internal static async Task<List<UserItems>> GetUserItemsAsync<T>(int id) where T : class
        {
            using (var _context = new VITS_DBContext())
            {

                var result = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 id = user.Id,
                                                 firstname = user.FirstName ,
                                                 lastname = user.LastName,
                                                 phone = user.Phone,
                                                 state = user.State,
                                                 city = user.City,
                                                 pix = user.Pix,
                                                 item = items.ItemType,
                                                 tag = items.TagNumber, 
                                                 paid = items.Paid,
                                                 itemid = items.Id,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now? "Not Expired" : "Expired"
                                             })
                    .Where(c => c.id.Equals(id)).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach(var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Pix = i.pix,
                        ItemType = i.item,
                        TagNumber = i.tag,
                        Paid = (bool)i.paid,
                        Expired = i.expired,
                        State = i.state,
                        City = i.city,
                        ItemId = i.itemid
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        public static void RemoveUsersAsync(int id)
        {
            using (var _context = new VITS_DBContext())
            {
                var _iSearch = _context.Vitsusers
                    .Find(id);
                if (_iSearch != null)
                {
                    _context.Vitsusers.Remove(_iSearch);
                    _context.SaveChanges();
                }
            }
        }

        internal static async Task<bool> AddAgent<T>(Agent account) where T : class
        {
            using (var _context = new VITS_DBContext())
            {
                var user = _context.Agents
                    .Where(c => c.LoginName == account.LoginName);

                if (user.Count() == 0)
                {
                    string passwordHash;
                    PasswordHashing.CreatePasswordHash(account.Password, out passwordHash);
                    account.Password = passwordHash;

                    _context.Agents.Add(account);
                    await _context.SaveChangesAsync();

                    return true;
                }

                return false;

            }
        }

        internal static List<Agent> Login<T>(Agent account) where T : class
        {
            using (var _context = new VITS_DBContext())
            {
                var _user = _context.Agents.Where(c => c.LoginName.Equals(account.LoginName));

                if (!PasswordHashing.VerifyPasswordHash(account.Password, _user.FirstOrDefault().Password))
                {
                    List<Agent> agents = new List<Agent>();
                    Agent _agent = new Agent
                    {
                        FirstName = "User not found"
                    };
                    agents.Add(_agent);
                    return agents;
                }
                else
                {
                    return _user.ToList(); 
                }
            }
        }
         
        public static async Task<List<Vitsitem>> SearchTags(string tag)
        {
            using (var _context = new VITS_DBContext())
            {
                var _tagSearch = await _context.Vitsitems
                    .Where(x => x.TagNumber == tag)
                    .Select(x => TagDTO(x))
                    .ToListAsync(); 

                return _tagSearch;
            }
        }

        internal static async Task<int> SetPayment(int id)
        {
            using (var _context = new VITS_DBContext())
            {
                try
                {
                    var _tagSearch = _context.Vitsitems.Find(id);

                    _tagSearch.Paid = true;
                    _tagSearch.AgentMonth = DateTime.Now.ToShortDateString();
                    _tagSearch.RegisteredDate = DateTime.Now.AddYears(1).ToLongDateString();
                    _context.SaveChanges();
                    return 1;
                }
                catch
                {
                    return 0;
                }
            }
        }

        private static Vitsitem TagDTO(Vitsitem user) =>
       new Vitsitem
       {
           ChasisNumber = user.ChasisNumber,
           ItemType = user.ItemType,
           Photo = user.Photo,
           PlateNumber = user.PlateNumber,
           TagNumber = user.TagNumber
       };
    }
}
